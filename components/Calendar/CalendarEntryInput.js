import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button, DatePickerAndroid, Platform, AsyncStorage} from 'react-native';
import Modal from "react-native-modal";
import moment from "moment";


export default class CalendarEntryInput extends React.Component {

    df = 'YYYY-MM-DD';
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
        console.log('newEventText:', this.state.newEventText);
        console.log('newEventDate:', this.state.newEventDate);

        if (this.state.newEventDate && this.state.newEventText) {
            this.props.callback({
                newEventDate: this.state.newEventDate,
                newEventText: this.state.newEventText,
            })
        }
    }

    receiveDate(data) {
        console.log(data);
        this.setState({ newEventDate: moment(data, this.df)});
    }

    render() {

        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={this._toggleModal}>
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
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({newEventText: text})}
                            placeholder='Event text'
                        />

                        <Text>
                            {'Valgt dato: '}
                            {this.state.newEventDate?
                                this.state.newEventDate.format('Do MMMM YYYY') :
                                this.props.defaultDate.format('Do MMMM YYYY')}
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

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems:'center'
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
