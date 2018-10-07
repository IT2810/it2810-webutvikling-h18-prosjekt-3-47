import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
} from 'react-native';
import PopupDialog from "react-native-popup-dialog";

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
        //console.log(this.state);
        if (this.state.name && this.state.phoneNumber && this.state.address) {
            this.props.callback(this.state)
            this.address.clear();
            this.phoneNumber.clear();
            this.name.clear();
            this.props.popupDialog.dismiss();
        } else {
            // Not all fields are filled
            console.log('Manglende informasjon');
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Name:</Text>
                <TextInput
                    ref={ (name) => this.name = name}
                    onChangeText={(text) => this.setState({name: text})}
                    placeholder="Fill in name here"
                />
                <Text>Phone Number:</Text>
                <TextInput
                    ref={ (phoneNumber) => this.phoneNumber = phoneNumber}
                    onChangeText={(text) => this.setState({phoneNumber: text})}
                    placeholder="Fill in phone number here"
                />
                <Text>Address:</Text>
                <TextInput
                    ref={ (address) => this.address = address}
                    onChangeText={(text) => this.setState({address: text})}
                    placeholder="Fill in address here"
                />
                {/* sddsd*/}
                <Button
                    title={'Save'}
                    onPress={() => {
                        this.sendContact();
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