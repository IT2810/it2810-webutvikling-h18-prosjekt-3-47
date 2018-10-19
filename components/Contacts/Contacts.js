/**
 * Contactscreen displays a list of the users contacts. The contacts are loaded using AsyncStorage.
 * By selecting one contact from the list the a popup with the contacts phone number and address is displayed.
 * The "Create New Contact"-button at the bottom of the screen triggers a popup with a contact information form.
 * Receives new contacts from the CreateContact component and stores them using AsyncStorage.
 */
import React from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import DialogTitle from "react-native-popup-dialog/src/components/DialogTitle";
import ContactList from './ContactList';
import CreateContact from './CreateContact';
import c from '../../constants/Colors'


export default class ContactsScreen extends React.Component {

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
    async storeData(path, data) {
        try {
            await AsyncStorage.setItem(path, JSON.stringify(data));
        } catch (error) {
            console.error('Error storing to AsyncStorage', error);
        }
    };

    /**
     *  Receives a newly created contact object and a reference to the clearInputs function from CreateContact.
     *  Pushes the contact to the state of ContactScreen and fires the clearInput function in CreateContactScreeen
     *  @param contact <object>
     *  @param callback <function>
     */
    receiveNewContact(contact, callback) {
        let contacts = this.state.contacts.slice();
        contacts.push(contact);
        if(callback && typeof callback === 'function'){
            callback();
        }
        this.storeData('contacts', contacts).then(() => {
            this._loadContacts();
        });
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
                    <CreateContact callback={this.receiveNewContact} popupDialog={this.state.popupDialog}/>
                </PopupDialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c.appMainBackground,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '3%',
    },
});
