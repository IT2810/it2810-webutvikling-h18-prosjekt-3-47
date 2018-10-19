/**
 * CreateContact displays a contact form.
 * When pushing the save (after some input checks) a contact with the given information is sent back to the
 * ContactsScreen, via the callback function, for storing. After the information is used in ContactScreen, a callback
 * is sent back to CreateContact to notify that the input (via state) can be safely cleared.
 */
import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import c from '../../constants/Colors';

export default class CreateContact extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: null,
            phoneNumber: null,
            address: null
        };

        this.clearInputs = this.clearInputs.bind(this);
    }
    /**
     * Sends the state (a new contact) back to the receiveNewContact-method in ContactScreen, if all fields are set
     * Then clears the textInputs and dismisses the popup, to make ready for new contact creations
     */
    sendContact() {
        //console.log(this.state);
        if (this.state.name && this.state.phoneNumber && this.state.address) {
            if (this.state.name.trim().length > 0 && this.state.phoneNumber.trim().length > 0 && this.state.address.trim().length > 0) {

                this.props.callback(this.state, this.clearInputs);
                this.props.popupDialog.dismiss();
            }
            else {
                // Some field contain only whitespace
                Alert.alert('Warning','Input length must be more than 0')
            }
        }
        else {
            // Not all fields are filled
            Alert.alert('Warning', 'All fields must be filled');
        }
    }

    clearInputs() {
        this.setState({
            address: null,
            phoneNumber: null,
            name: null
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({name: text})}
                    placeholder="Fill in name here"
                />
                <Text style={styles.text}>Phone Number:</Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={styles.input}
                    value={this.state.phoneNumber}
                    onChangeText={(text) => this.setState({phoneNumber: text})}
                    placeholder="Fill in phone number here"
                />
                <Text style={styles.text}>Address:</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.address}
                    onChangeText={(text) => this.setState({address: text})}
                    placeholder="Fill in address here"
                />
                <View style={styles.button}>
                    <Button
                    title={'  Save  '}
                    onPress={() => {
                        this.sendContact();
                    }}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: c.appMainBackground,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '94%',
        marginLeft: '3%',
    },
    text: {
        marginLeft: '3%',
        fontSize: 16,
        marginTop: '2%',
    },
    button: {
        alignItems: 'center',
        marginTop: '2%',
    }
});
