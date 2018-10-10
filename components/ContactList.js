import React from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    View,
    Button,
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
                <ListView
                    dataSource = {this.ds.cloneWithRows(this.props.contacts, rowIdentities)}
                    renderRow={
                        (rowData) => {
                            return (
                                <Button
                                    title={rowData.name}
                                    style={styles.text}
                                    onPress={() =>{
                                        this.openContact(rowData)
                                    }}
                                />
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
        marginLeft: 12,
        fontSize: 16,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    }
});
