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

import CreateContactScreen from './CreateContactScreen'


export default class ContactsScreen extends React.Component {
    static navigationOptions = {
        title: 'Contacts',
    };

    constructor(props){
        super(props);

        this.state = {
            contacts: []
        };

        this.receiveNewContact = this.receiveNewContact.bind(this);
    }

    _loadContacts = async () => {
        try {
            const value = await AsyncStorage.getItem('contacts');
            if (value !== null) {
                console.log(value);
                console.log(JSON.parse(value));
                this.setState(() => ({
                    contacts: JSON.parse(value)
                }));
            }
        } catch (error) {
            console.log('AsyncStorage error while loading: ' + error.message);
        }
    };

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

    _storeContact = async () => {
        try{
            await AsyncStorage.setItem('contacts', JSON.stringify(this.contacts));
        } catch (error) {
            console.log('AsyncStorage error while storing: ' + error.message);
        }
    };

    receiveNewContact(contact) {
        //console.log(contact);
        //console.log(JSON.parse(contact));
        let contacts = this.state.contacts.slice();
        contacts.push(contact);
        this.setState({contacts: contacts});
        //this.setState(prevState => ({
        //   contacts: prevState.contacts.push(contact)
        //}));
        console.log(this.state.contacts);
    }

    componentDidMount() {
        //this._storeContact();
        this._loadContacts();
    }

    render() {
        return (
            <View style={styles.container}>
                <ContactList contacts={this.state.contacts}/>
                <Text style={styles.noNotesText}>You have no contacts</Text>
                <Button
                    title='Create Contact'
                    onPress={() =>{
                        this.popupDialog.show();
                    }}
                />
                <PopupDialog
                    style={styles.container}
                    dialogTitle={<DialogTitle title="New Contact" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    height={Number(600)}>
                    <CreateContactScreen callback={this.receiveNewContact} popupDialog={this.popupDialog}/>
                </PopupDialog>
            </View>
        );
    }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',

  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});