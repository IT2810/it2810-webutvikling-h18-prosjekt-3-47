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
import Modal from "react-native-modal";
import moment from "moment";
import df from '../../constants/dateFormats' // Importing date format constants

export default class CalendarEntryInput extends React.Component {

    constructor (props){
        super(props);

        moment.locale('nb');

        this.state = {
            isModalVisible: false,
            newEventDate: null,
            newEventText: null
        };

        this.requestClose = this.requestClose.bind(this);
        this.sendData = this.sendData.bind(this);
        this.receiveDate = this.receiveDate.bind(this);
    }


    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    requestClose() {
        this.setState({ isModalVisible: false })
    }

    sendData() {

        if (this.state.newEventText) {
            this.props.callback({
                dateString:
                    this.state.newEventDate ?
                    this.state.newEventDate.format(df.defaultDate) :
                    this.props.defaultDate.format(df.defaultDate),

                text: this.state.newEventText,
            });

            this.requestClose();
            this.textInput.clear();
        }
    }

    receiveDate(data) {
        console.log(data);
        this.setState({ newEventDate: moment(data, df.defaultDate)});
    }

    render() {

        return (
            <View style={[styles.view, {flex: this.state.isModalVisible? 1 : 0}]}>
                <TouchableOpacity style={this.touchableOpacity} onPress={this._toggleModal}>
                    <Text style={styles.toggleModalText}>Show Modal</Text>
                </TouchableOpacity>
                <Modal
                    style={styles.modalContainer}
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.requestClose}
                    onSwipe={this.requestClose}
                    swipeDirection="down"
                    onRequestClose={this.requestClose}
                    >

                    <View style={styles.modalView}>

                        <TouchableOpacity onPress={this._toggleModal}>
                            <Text style={styles.toggleModalText}>Hide me!</Text>
                        </TouchableOpacity>

                        <TextInput
                            ref={input => { this.textInput = input }}
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({newEventText: text})}
                            placeholder='Event text'
                        />

                        <Text>
                            {'Valgt dato: '}
                            {/* Shows the user selected date if it is set, otherwise shows defaultDate from it props*/}
                            {this.state.newEventDate?
                                this.state.newEventDate.format(df.longDisplayDate) :
                                this.props.defaultDate.format(df.longDisplayDate)}
                        </Text>



                        <Button style={styles.button}
                                onPress={this.sendData}
                                title="Submit!"
                                color="#841584"
                                accessibilityLabel="Submit the new entry"
                        />
                        <Button style={styles.button}
                                onPress={() => {this.props.openDatePicker(this.receiveDate)}}
                                title="Open date picker!"
                                color="#841584"
                                accessibilityLabel="Open the date picker"
                        />
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
        flex: 1
    },
    toggleModalText: {
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    modalView: {
        width: '90%',
        flex: 1,
        backgroundColor: '#fff'
    },
    button: {

    }
});
