import React from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import PopupDialog from "react-native-popup-dialog";
import DialogTitle from "react-native-popup-dialog/src/components/DialogTitle";
import DisplayContact from "./DisplayContact";

export default class ContactList extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            contact: {
                name: null,
                phoneNumber: null,
                address: null
            }
        };
    }

    openContact(contact) {
        this.setState(() => ({
            contact: contact
        }));
        this.popupDialog.show()

    };


    render(dataBlob, rowIdentities) {
        return (
            <View style={styles.container}>
                {/* Setting `enableEmptySections` to surpress warning which will be gone in a future release
                https://facebook.github.io/react-native/docs/listview.html#enableemptysections
                <Button
                                    title={rowData.name}
                                    style={styles.button}
                                    onPress={() =>{
                                        this.openContact(rowData)
                                    }}
                                />
                */}
                <ListView enableEmptySections={true}
                    dataSource = {this.ds.cloneWithRows(this.props.contacts, rowIdentities)}
                    renderRow={
                        (rowData) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.openContact(rowData)}}>
                                        <Text style={styles.text}>{rowData.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    }
                    renderSeparator={(sectionId, rowIdentities) => <View key={rowIdentities} style={styles.separator} />}
                />
                <PopupDialog
                    dialogTitle={<DialogTitle title={this.state.contact.name} />}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}>
                    <DisplayContact contact={this.state.contact} />
                </PopupDialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 8,
        fontSize: 18,
        marginTop: 12,
        marginBottom: 4,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});
