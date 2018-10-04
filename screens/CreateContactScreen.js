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
            name: "",
            phoneNumber: "",
            address: ""
        };
    }

    saveContact () => {

    };

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
                <Button
                    title={Save}
                    onPress={saveContact}
                />
            </View>
        )
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