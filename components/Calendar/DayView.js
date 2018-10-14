/**
 * A component showing a day and its events.
 *
 * Initialised with the following props:
 * date: moment.js date object
 * events: an array of all events on the given date (empty array if no events on that day)
 */
import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import df from '../../constants/DateFormats' // Importing date format constants
import c from '../../constants/Colors'


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
                    <View key={i}
                          style={styles.eventContainer}
                          accessibilityLabel={'Kalenderhendelse nummer ' + i+1 + ' den ' +
                          this.props.date.format(df.longDisplayDate) + ':' + eArr[i].text}>
                        <Text style={styles.eventTitle}>{eArr[i].text}</Text>

                        {/* Showing horizontal divider after all but the last item of the day */
                            (i !== eArr.length-1) &&
                            <View style={styles.hr}/>
                        }
                    </View>
                );
            }
        }

        let dayName = this.props.date.format(df.dayName);

        return (
            <View style={styles.container}>
                <ScrollView style={styles.dayContainer}>
                    <Text style={styles.dayHeader}>{this.props.date.format('Do')} <Text style={styles.dayHeaderName}>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</Text></Text>
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
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    dayHeader: {
        fontSize: 40,
        color: c.mutedText
    },
    dayHeaderName: {
        fontSize: 30,
        color: c.moreMutedText
    },
    eventContainer: {
        flex: 1,
        margin: 10
    },
    hr: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderBottomColor: c.divider
    },
    eventTitle: {
        fontSize: 20,
        marginRight: 10,
        marginTop: 7,
        padding: 10,
        color: c.normalTextColor
    }
});
