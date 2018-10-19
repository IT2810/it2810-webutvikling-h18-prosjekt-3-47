import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
} from 'react-native';

import PropTypes from 'prop-types'

export default class SimpleButton extends React.Component {
    render () {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View>
                    <Text>{this.props.customText || 'Simple Button'}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

SimpleButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    customText: PropTypes.string
};