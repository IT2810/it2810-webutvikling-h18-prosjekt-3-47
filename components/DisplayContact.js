import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

export default class DisplayContact extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Name: {this.props.contact.name}</Text>
                <Text>Telephone number: {this.props.contact.phoneNumber}</Text>
                <Text>Address: {this.props.contact.address}</Text>
            </View>
        )
    }
}
