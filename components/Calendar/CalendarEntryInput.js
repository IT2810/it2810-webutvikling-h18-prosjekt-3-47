/**
 * A modal view for entering events with a description and date.
 *
 * Initialised with the following props:
 * callback: function that is called whenever a
 * openDatePicker: This function will be called when the user presses the button to open the date picker
 * defaultDate: the date that wil be selected when opening the modal
 */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Modal from 'react-native-modal';
import moment from 'moment';
import df from '../../constants/dateFormats' // Importing date format constants

export default class CalendarEntryInput extends React.Component {

    constructor (props){
        super(props);

        moment.locale('nb');

        this.state = {
            isModalVisible: false,
            newEventDate: null,
            newEventText: ''
        };

        this.inputError = null;

        this.requestClose = this.requestClose.bind(this);
        this.sendData = this.sendData.bind(this);
        this.receiveDate = this.receiveDate.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({ isModalVisible: !this.state.isModalVisible }, () => {
            if (this.state.isModalVisible){
                this.textInput.focus();
            }
        });
    }

    componentWillUnmount() {
        this.requestClose();
    }

    requestClose() {
        this.setState({ isModalVisible: false })
    }

    sendData() {
        if (this.validateInput(this.state.newEventText, 'submit') && this.state.newEventText) {
            this.props.callback({
                dateString:
                    this.state.newEventDate ?
                    this.state.newEventDate.format(df.defaultDate) :
                    this.props.defaultDate.format(df.defaultDate),

                text: this.state.newEventText.trim(),
            });

            this.requestClose();
            this.textInput.clear();
        }
    }

    validateInput(text, type) {

        if (text) {
            let textTrimmed = text.trim();

            this.inputError = null;
            console.log('textTrimmed:', textTrimmed);
            console.log('textTrimmed.length:', textTrimmed.length);
            console.log('text.length:', text.length);
            if (textTrimmed.length < 3) {
                this.inputError = 'Må være minst tre tegn lang';
                return false;
            }
        } else if (type === 'submit') {
            console.log('validating submit');
            console.log('input error!!!');
            this.inputError = 'Dette feltet er påkrevd';

            /*
            react-native-material-textfield does not seem to display a new error message
            unless there is a value change, so here is a hacky solution
            */
            this.setState(prevState => ({
               newEventText: prevState.newEventText + ' '
            }));

            return false;
        }

        return true;
    }

    receiveDate(data) {
        console.log(data);
        this.setState({ newEventDate: moment(data, df.defaultDate)});
    }

    render() {
        // Shows the user selected date if it is set, otherwise shows defaultDate from its props
        let chosenDate = this.state.newEventDate?
            this.state.newEventDate.format(df.longDisplayDate) :
            this.props.defaultDate.format(df.longDisplayDate);

        return (
            <View style={[styles.view, {flex: this.state.isModalVisible? 1 : 0}]}>
                <TouchableOpacity style={this.touchableOpacity}
                                  onPress={this.toggleModal}
                                  accessibilityLabel='Legg til en ny kalenderhendelse'>
                    <Text style={styles.buttonText}>Legg til ny hendelse</Text>
                </TouchableOpacity>
                <Modal
                    style={styles.modalContainer}
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.requestClose}
                    onSwipe={this.requestClose}
                    swipeDirection='down'
                    onRequestClose={this.requestClose}
                    >

                    <View style={styles.modalView}>

                        <TouchableOpacity onPress={this.toggleModal}
                                          accessibilityLabel='Skjul ny-kalenderhendelse-popupen'>
                            <Text style={styles.buttonText}>Skjul popup</Text>
                        </TouchableOpacity>

                        <TextField
                            ref={input => { this.textInput = input }}
                            label='Hendelsesbeskrivelse'
                            accessibilityLabel='Skriv inn tekstbeskrivelse av ny kalenderhendelse'
                            placeholder='Møte med Siv Jensen'
                            error={this.inputError}
                            value={this.state.newEventText}
                            onChangeText={(text) => {
                                this.validateInput(text, 'textChange');
                                this.setState({newEventText: text});
                            }}
                            fontSize={18}
                            labelFontSize={16}
                            titleFontSize={16}
                            multiline={true}
                        />

                        <Text accessibilityLabel={'Valgt dato for den nye kalenderhendelsen er ' + chosenDate}>
                            Valgt dato: {chosenDate}
                        </Text>

                        <TouchableOpacity style={styles.button}
                                          onPress={() => {this.props.openDatePicker(this.receiveDate)}}
                                          accessibilityLabel='Åpne datovelgeren for å velge dato for den nye kalenderhendelsen'>
                            <Text style={styles.buttonText}> Åpne datovelgeren</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={this.sendData}
                                          accessibilityLabel='Lagre kalenderhendelsen'>
                            <Text style={styles.buttonText}> Lagre </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    view: {
        alignItems:'center'
    },
    touchableOpacity: {
        flex: 1,
        alignItems:'center'
    },
    buttonText: {
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    modalView: {
        width: '85%',
        padding: '2.5%',
        flex: 1,
        backgroundColor: '#fff'
    },
    button: {

    }
});
