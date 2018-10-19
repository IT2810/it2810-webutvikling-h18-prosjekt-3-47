import React from 'react';
import Contacts from '../components/Contacts/Contacts'

export default class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Contacts',
    };

    render() {
        return <Contacts/>
    }
}
