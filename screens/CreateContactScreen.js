import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    AsyncStorage,
} from 'react-native';

import ContactList from '../components/ContactList';

export default class CreateContactScreen extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: null,
            phoneNumber: null,
            address: null
        };
    }

    sendContact() {
        if (this.state.name && this.state.phoneNumber && this.state.address) {
            this.props.callback(this.state)
        } else {
            // Not all fields are filled
            console.log('manglende informasjon');
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Create Contact</Text>
                <Text>Name:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({name: text})}
                    placeholder="Fill in name here"
                />
                <Text>Phone Number:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({phoneNumber: text})}
                    placeholder="Fill in phone number here"
                />
                <Text>Address:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({address: text})}
                    placeholder="Fill in address here"
                />
                {/* sddsd*/}
                <Button
                    title={'Save'}
                    onPress={() => {
                        this.sendContact();
                        this.props.popupDialog.dismiss()
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',

    }
})