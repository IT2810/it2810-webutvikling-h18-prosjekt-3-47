import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button, DatePickerAndroid, Platform, AsyncStorage} from 'react-native';
import Modal from "react-native-modal";


export default class CalendarEntryInput extends React.Component {

    constructor (props){
        super(props);

        this.state = {
            isModalVisible: false,
            newEventDate: '2018-10-01',
            newEventText: null
        };

        this.requestClose = this.requestClose.bind(this);
        this.sendData = this.sendData.bind(this);
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

    render() {

        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={this._toggleModal}>
                    <Text>Show Modal</Text>
                </TouchableOpacity>
                <Modal
                    style={styles.modalContainer}
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.requestClose}
                    onSwipe={this.requestClose}
                    swipeDirection="left"
                    onRequestClose={this.requestClose}
                    >

                    <View style={styles.modalView}>
                        <Text>Hello!</Text>

                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({newEventText: text})}
                        />

                        <TouchableOpacity onPress={this._toggleModal}>
                            <Text>Hide me!</Text>
                        </TouchableOpacity>

                        <Button style={styles.button}
                                onPress={this.sendData}
                                title="Submit!"
                                color="#841584"
                                accessibilityLabel="Submit the new entry"
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
    modalContainer: {
      flex: 1,
      alignItems: 'center'
    },
    modalView: {
        width: '80%',
        flex: 1,
        backgroundColor: '#fff'
    },
    button: {

    }
});
