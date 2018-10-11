/**
 * A modal view for entering events with a description and date.
 *
 * Didn't have much time to test on iOS, so the iOS solution for the date picker is somewhat hacky and not that great.
 * But it is a proof of concept, and it seems to work. The problem I ran into is that the iOS date picker cannot be
 * displayed over the modal. Therefore, the modal closes, and then waits a bit for the animation before it opens the
 * date picker. Likewise, when the date picker is closed, it waits for the animation before it opens the modal again.
 * Exception when the date picker is closed and a date was chosen, then react-native-modal-datetime-picker provides a
 * callback after the animation is done.
 *
 * Initialised with the following props:
 * callback: function that is called whenever a
 * defaultDate: the date that wil be selected when opening the modal
 */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Keyboard, TextInput, Button, Platform} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import df from '../../constants/dateFormats' // Importing date format constants

export default class CalendarEntryInput extends React.Component {

    constructor (props){
        super(props);

        moment.locale('nb');

        this.state = {
            isModalVisible: false,
            newEventDate: null,
            newEventText: '',
            isDateTimePickerVisible: false
        };

        this.inputError = null;

        this.requestShowModal = this.requestShowModal.bind(this);
        this.requestCloseModal = this.requestCloseModal.bind(this);
        this.sendData = this.sendData.bind(this);
        this.receiveDate = this.receiveDate.bind(this);
        //this.toggleModal = this.toggleModal.bind(this);
        this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind(this);
    }

    /**
     * TODO
     */
    componentWillUnmount() {
        this.requestCloseModal();
    }

    /**
     * TODO
     */
    requestShowModal() {
        this.setState({ isModalVisible: true});
    }

    /**
     * TODO
     * @param iOSCallback
     */
    requestCloseModal(iOSCallback) {
        this.setState({ isModalVisible: false }, () => {
            if (Platform.OS === 'ios' && typeof(iOSCallback) === 'function') {
                iOSCallback();
            }
            })
    }

    /**
     * TODO
     */
    sendData() {
        if (this.validateInput(this.state.newEventText, 'submit') && this.state.newEventText) {
            this.props.callback({
                dateString:
                    this.state.newEventDate ?
                    this.state.newEventDate.format(df.defaultDate) :
                    this.props.defaultDate.format(df.defaultDate),

                text: this.state.newEventText.trim(),
            });

            this.requestCloseModal();
            this.textInput.clear();
        }
    }

    /**
     * TODO
     */
    showDateTimePicker(){
        this.setState({ isDateTimePickerVisible: true });
    }

    /**
     * TODO
     * @param iOSCallback
     */
    hideDateTimePicker(iOSCallback) {
        this.setState({ isDateTimePickerVisible: false }, () => {
            if (Platform.OS === 'ios' && typeof iOSCallback === 'function') {
                iOSCallback();
            }
        });
    }

    /**
     * TODO
     * @param data
     */
    receiveDate(data) {
        this.hideDateTimePicker();
        this.setState({ newEventDate: moment(data)});
    }

    /**
     * TODO
     * @param text
     * @param type
     * @return {boolean}
     */
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


    render() {
        // Shows the user selected date if it is set, otherwise shows defaultDate from its props
        let chosenDate = this.state.newEventDate?
            this.state.newEventDate.format(df.longDisplayDate) :
            this.props.defaultDate.format(df.longDisplayDate);

        return (
            <View style={[styles.view, {flex: this.state.isModalVisible? 1 : 0}]}>
                <TouchableOpacity style={this.touchableOpacity}
                                  onPress={this.requestShowModal}
                                  accessibilityLabel='Legg til en ny kalenderhendelse'>
                    <Text style={styles.buttonText}>Legg til ny hendelse</Text>
                </TouchableOpacity>
                <Modal
                    style={styles.modalContainer}
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.requestCloseModal}
                    onSwipe={this.requestCloseModal}
                    swipeDirection='down'
                    onRequestClose={this.requestCloseModal}
                    >

                    <View style={styles.modalView}>

                        <TouchableOpacity onPress={this.requestCloseModal}
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
                                          onPress={() => {
                                              if (Platform.OS === 'ios') {
                                                  Keyboard.dismiss();
                                                  this.requestCloseModal(() => {
                                                      // Waiting arbitrary amount of time before showing the date picker
                                                      setTimeout(this.showDateTimePicker, 500);
                                                  });
                                              } else {
                                                  this.showDateTimePicker();
                                              }
                                          }}
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
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.receiveDate}
                    onCancel={() => {
                        this.hideDateTimePicker(() => {
                            /*
                            iOS specific callback, waiting arbitray amount of time before showing modal after
                            picker closing
                             */
                            setTimeout(this.requestShowModal, 500);
                            }
                        );
                    }}
                    onHideAfterConfirm={() => {
                        if (Platform.OS === 'ios') {
                            // No need for delay here, as this is called after the animation is done.
                            this.requestShowModal();
                        }
                    }}
                />
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
