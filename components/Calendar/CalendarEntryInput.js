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
 * callback: function that is called whenever a valid new entry is submitted.
 *     The callback receives an object with `dateString` and `text` keys
 *
 * defaultDate: the date that wil be preselected when opening the modal
 */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Keyboard, Platform} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import df from '../../constants/DateFormats' // Importing date format constants
import lc from '../../constants/Locale' // Importing project locale constants
import c from '../../constants/Colors'

export default class CalendarEntryInput extends React.Component {

    constructor (props){
        super(props);

        moment.locale(lc.languageCode);

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
        this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind(this);
    }

    /**
     * Updates state to show the modal
     */
    requestShowModal() {
        this.setState({ isModalVisible: true});
    }

    /**
     * Updates state to close the modal, calls iOSCallback if iOS
     *
     * @param iOSCallback <function> will be called if platform is iOS (and the argument is indeed a function)
     */
    requestCloseModal(iOSCallback) {
        this.setState({ isModalVisible: false }, () => {
            if (Platform.OS === 'ios' && typeof(iOSCallback) === 'function') {
                iOSCallback();
            }
            })
    }

    /**
     * Validates the input with the 'submit' parameter, and then calls the prop callback with a object.
     * If newEventDate is not defined (e.g. the user has not set any new date in the date picker inside this component),
     * it returns defaultDate, which is given as a prop by the parent.
     * Returns newEventText trimmed to remove leading and trailing whitespace.
     * Calls to close the Modal, and then clears the text input.
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
     * Updates state to hide the date picker
     */
    showDateTimePicker(){
        this.setState({ isDateTimePickerVisible: true });
    }

    /**
     * Updates state to hide the date picker, and calls a callback if the platform is iOS
     *
     * @param iOSCallback <function> will be called after the state has been updated
     */
    hideDateTimePicker(iOSCallback) {
        this.setState({ isDateTimePickerVisible: false }, () => {
            if (Platform.OS === 'ios' && typeof iOSCallback === 'function') {
                iOSCallback();
            }
        });
    }

    /**
     * Sent as a callback function to react-native-modal-datetime-picker. Is called whenever a date has been chosen.
     * This function hides the picker, and updates the state.
     *
     * @param data <object> JS Date Object sent from react-native-modal-datetime-picker
     */
    receiveDate(data) {
        this.hideDateTimePicker();
        this.setState({ newEventDate: moment(data)});
    }

    /**
     * Checks if the text input is valid, and updates the inputError.
     * Since react-native-material-textfield for some reason does not update its error unless there is a value change,
     * the value is updated when the user tries to submit an empty field, so that the error message is displayed. Not
     * the best solution, but there is not enough time to find a better solution.
     *
     * @param text <string> Value from the text input
     * @param type <string> to tell if it is validating on submit or just text input change
     * @return {boolean} true if input is valid, false otherwise
     */
    validateInput(text, type) {
        let textTrimmed = text.trim();

        if (text && textTrimmed.length > 0) {
            this.inputError = null;
            if (textTrimmed.length < 3) {
                this.inputError = 'Må være minst tre tegn lang';
                return false;
            }
        } else if (type === 'submit') {
            this.inputError = 'Dette feltet er påkrevd';
            /*
            react-native-material-textfield does not seem to display a new error message
            unless there is a value change, so here is a hacky solution
            */
            this.setState(prevState => ({
               newEventText: prevState.newEventText.trim()
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

                    <ScrollView style={styles.modalView}>

                        <TouchableOpacity onPress={this.requestCloseModal}
                                          accessibilityLabel='Skjul ny-kalenderhendelse-popupen'>
                            <Text style={styles.buttonText}>Skjul popup</Text>
                        </TouchableOpacity>

                        <TextField
                            //style={{maxHeight: 80}}
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

                        <Text style={styles.chosenDateText}
                              accessibilityLabel={'Valgt dato for den nye kalenderhendelsen er ' + chosenDate}>
                            Valgt dato: {chosenDate}
                        </Text>

                        <TouchableOpacity onPress={() => {
                                              if (Platform.OS === 'ios') {
                                                  Keyboard.dismiss();
                                                  this.requestCloseModal(() => {
                                                      // Waiting for animation to finish before showing the date picker
                                                      setTimeout(this.showDateTimePicker, 500);
                                                  });
                                              } else {
                                                  this.showDateTimePicker();
                                              }
                                          }}
                                          accessibilityLabel='Åpne datovelgeren for å velge dato for den nye kalenderhendelsen'>
                            <Text style={styles.buttonText}> Åpne datovelgeren</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.sendData}
                                          accessibilityLabel='Lagre kalenderhendelsen'>
                            <Text style={styles.buttonSubmitText}> Lagre </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Modal>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.receiveDate}
                    onCancel={() => {
                        this.hideDateTimePicker(() => {
                            /*
                            iOS specific callback as anonymous function, waiting for animation to finish
                            before showing modal after date picker closing
                             */
                            setTimeout(this.requestShowModal, 500);
                            }
                        );
                    }}
                    onHideAfterConfirm={() => {
                        if (Platform.OS === 'ios') {
                            // No need for a timeout here, as this is called after the animation is done.
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
    chosenDateText: {
        marginLeft: 5,
        marginBottom: 10,
        color: c.mutedText,
        fontSize: 16
    },
    buttonText: {
        fontSize: 20
    },
    buttonSubmitText: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: 25
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    modalView: {
        width: '85%',
        padding: '2.5%',
        flex: 1,
        backgroundColor: c.appMainBackground
    }
});
