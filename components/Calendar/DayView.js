import React from 'react';
import { Icon } from 'expo';
import {ScrollView, StyleSheet, View, Platform, Text} from 'react-native';


export default class DayView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        let events = [];

        //console.log(this.props.events);


        let i = 0;
        if (Array.isArray(this.props.events)) {
            for (let event of this.props.events){
                //console.log(event);
                events.push(
                    <View key={i} style={styles.eventContainer}>
                        <Text style={styles.eventTitle}>{event.text}</Text>
                    </View>
                );
                i++;
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
        margin: 10,
    },
    eventTitle: {
        fontSize: 20,
        marginRight: 10,
        marginTop: 17,
        padding: 10,
        color: '#303030'
    }
});
