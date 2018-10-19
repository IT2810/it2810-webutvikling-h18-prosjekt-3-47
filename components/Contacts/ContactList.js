/**
 * ContactList displays a list of the users contacts. The contacts are sent as props by the ContactsScreen component
 * on rendering, and are displayed using a ListView component.
 * By selecting one contact from the list the a popup with the contacts phone number and address is displayed.
 */
import React from 'react';
import {StyleSheet, Text, ListView, View, TouchableOpacity,} from 'react-native';

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
                https://facebook.github.io/react-native/docs/listview.html#enableemptysections                */}
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
        padding: '3%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: '3%',
        fontSize: 18,
        marginTop: '3%',
        marginBottom: '3%',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});
