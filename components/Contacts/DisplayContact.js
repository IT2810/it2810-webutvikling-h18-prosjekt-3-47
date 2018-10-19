/**
 * DisplayContact displays the contact information, including phone number and address, of a contact.
 * The contact is sent as props to the component and the contact information is displayed in three text components.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DisplayContact extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Name: {this.props.contact.name}</Text>
                <Text style={styles.text}>Telephone number: {this.props.contact.phoneNumber}</Text>
                <Text style={styles.text}>Address: {this.props.contact.address}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginLeft: '3%',
        fontSize: 16,
        marginTop: '1%',
    },
});