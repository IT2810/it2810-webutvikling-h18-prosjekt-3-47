
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    AsyncStorage
} from 'react-native';

import PopupDialog from 'react-native-popup-dialog';
import DialogTitle from "react-native-popup-dialog/src/components/DialogTitle";

import ContactList from '../components/ContactList';

import CreateContactScreen from './CreateContactScreen';


export default class ContactsScreen extends React.Component {
    static navigationOptions = {
        title: 'Contacts',
    };

    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            popupDialog: null
        };

        // Calling this inside receiveNewContact will point to ContactScreen
        this.receiveNewContact = this.receiveNewContact.bind(this);
    }

    /**
     * Loading existing contacts using AsyncStorage, into the state of ContactScreen
     *
     */
    _loadContacts = async () => {
        try {
            const value = await AsyncStorage.getItem('contacts');
            if (value !== null) {
                //console.log(value);
                //console.log(JSON.parse(value));
                this.setState(() => ({
                    contacts: JSON.parse(value)
                }));
            }
        } catch (error) {
            console.log('AsyncStorage error while loading: ' + error.message);
        }
    };

    // Placeholders
    contacts = [
        {
            name: "Navn Navnesen 1",
            phoneNumber: 12345678,
            address: "Adresse 1"
        },
        {
            name: "Navn Navnesen 2",
            phoneNumber: 87654321,
            address: "Adresse 2"
        }
    ];

    /**
     *  Storing the current contacts using AsyncStorage, from the state of ContactScreen
     *
     */
    _storeContact = async () => {
        try {
            await AsyncStorage.setItem('contacts', JSON.stringify(this.contacts));
        } catch (error) {
            console.log('AsyncStorage error while storing: ' + error.message);
        }
    };

    /**
     *  Receives a newly created contact object from CreateContactScreen, and push it to the state of ContactScreen
     *  @param contact <object>
     */
    receiveNewContact(contact) {
        let contacts = this.state.contacts.slice();
        contacts.push(contact);
        this.setState({contacts: contacts});
    }

    componentDidMount() {
        //this._storeContact();
        this._loadContacts();
    }

    render() {
        return (
            <View style={styles.container}>
                <ContactList contacts={this.state.contacts}/>
                <Button
                    title='Create New Contact'
                    onPress={() => {
                        this.state.popupDialog.show();
                    }}
                />
                <PopupDialog
                    dialogTitle={<DialogTitle title="New Contact"/>}
                    ref={(popupDialog) => {
                        if (!this.state.popupDialog){
                            this.setState({
                                popupDialog: popupDialog
                            })
                        }
                    }}
                    height={Number(400)}>
                    <CreateContactScreen callback={this.receiveNewContact} popupDialog={this.state.popupDialog}/>
                </PopupDialog>
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
      paddingBottom: 10,
  },
})
