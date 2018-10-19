import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// Importing project color constants:
import c from '../constants/Colors';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null, // Since we don't want a top bar header on this page
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.header}>
                            Velkomment til vår app!
                        </Text>
                        <Text style={styles.subHeader}>
                            Vi har fire forskjellige komponenter: Calendar, Geolocation, Contacts og Todolist
                        </Text>
                        <Text style={styles.normalText}>
                            Denne appen er en del av IT2810 ved NTNU, laget av gruppe 47 høsten 2018.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c.appMainBackground,
    },
    contentContainer: {
        paddingTop: 100,
    },
    TextContainer: {
        alignItems: 'center',
        marginHorizontal: 40,
    },
    header: {
        fontSize: 30,
        marginBottom: 20
    },
    subHeader: {
        fontSize: 24,
        color: c.mutedText
    },
    normalText: {
        marginTop: 60,
        fontSize: 20
    }
});
