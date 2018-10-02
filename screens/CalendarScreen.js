import React from 'react';
import Calendar from '../components/Calendar/Calendar'

export default class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Calendar',
    };

    render() {
        return <Calendar/>
    }
}
