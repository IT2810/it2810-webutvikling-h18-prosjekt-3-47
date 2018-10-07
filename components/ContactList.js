import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';

export default class ContactList extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render(dataBlob, rowIdentities) {
        return (
            <ListView
                dataSource = {this.ds.cloneWithRows(this.props.contacts, rowIdentities)}
                renderRow={
                    (rowData) => {
                        return (
                            <TouchableHighlight onPress={() => console.log(rowData)}>
                                <Text>{rowData.name}</Text>
                            </TouchableHighlight>
                        )
                    }
                }
            />
        )
    }
}
