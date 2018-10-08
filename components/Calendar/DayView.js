/**
 * A component showing a day and its events.
 *
 * Initialised with the following props:
 * day: The day formatted as 'Do'. ex: '31.'
 * dayName: The day name. ex: 'Mandag'
 */
import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';


export default class DayView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        let events = [];

        let eArr = this.props.events;
        if (Array.isArray(eArr)) {
            for (let i = 0; i < eArr.length; i++){
                events.push(
                    <View key={i} style={styles.eventContainer}>
                        <Text style={styles.eventTitle}>{eArr[i].text}</Text>
                        {(i !== eArr.length-1) &&
                        <View style={styles.hr}/>
                        }
                    </View>
                );
            }
        }

        let dayName = this.props.dayName;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.dayContainer}>
                    <Text style={styles.dayHeader}>{this.props.day} <Text style={styles.dayHeaderName}>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</Text></Text>
                    {events}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dayContainer: {
        backgroundColor: '#fff',
        flex: 1
    },
    dayHeader: {
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        fontSize: 40,
        color: '#696969'
    },
    dayHeaderName: {
        fontSize: 30,
        color: '#909090'
    },
    eventContainer: {
        flex: 1,
        margin: 10
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    eventTitle: {
        fontSize: 20,
        marginRight: 10,
        marginTop: 7,
        padding: 10,
        color: '#303030'
    }
});
