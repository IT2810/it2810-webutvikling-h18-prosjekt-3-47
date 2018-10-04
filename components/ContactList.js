import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ListView,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';

export default class ContactList extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render() {
        return (
            <ListView
            dataSource={
                this.ds.cloneWithRows([
                    {name: "Jørgen", tlf: "12345678", id: 1},
                    {name: "Sigurd", tlf: "87654321", id: 2}
                ])
            }
            renderRow={
                (rowData) => {
                    return (
                        <TouchableHighlight onPress={() => console.log(rowData)}>
                            <Text>{rowData.name}</Text>
                        </TouchableHighlight>
                    )
                }
            }/>
        )
    }
}
