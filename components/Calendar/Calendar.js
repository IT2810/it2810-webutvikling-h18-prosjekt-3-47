import React from 'react';
import {ScrollView, StyleSheet, View, Button, DatePickerAndroid, Platform, Text} from 'react-native';
import { Calendar, Agenda, LocaleConfig} from 'react-native-calendars';
import DayView from './DayView'
import moment from 'moment';
import 'moment/locale/nb';

export default class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Calendar',
    };

    colors = ['green', 'blue', 'grey', 'orange', 'salmon', 'red'];

    constructor (props){
        super(props);

        // Moment locale reference: http://momentjs.com/docs/#/i18n/adding-locale/
        moment.locale('nb');

        this.state = {
            view: 'Calendar',
            now: moment(),
            selected: moment(),
            events: {
                '2018-10-02': [{text: 'item 1 - Møte med Per'}],
                '2018-10-03': [{text: 'item 2 - Møte med Pål'}],
                '2018-10-04': [],
                '2018-10-05': [{text: 'item 3 - Møte med Espen'},{text: 'item 4 - Møte med Jens'}, {text: 'item 3 - Møte med Espen'},{text: 'item 4 - Møte med Jens'}]
            }

        };

        this.subtractMonth = this.subtractMonth.bind(this);
        this.addMonth = this.addMonth.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
        this.generateEventMarkers = this.generateEventMarkers.bind(this);
    }

    generateEventMarkers() {
        let eventMarkers = {};
        let i = 19;
        for (let key of Object.keys(this.state.events)) {
            eventMarkers[key] = {};
            if(this.formattedString(this.state.selected) === key) {
                eventMarkers[key].selected = true;
                eventMarkers[key].selectedColor = 'blue';
            } else {
                eventMarkers[key].disabled = true;
            }
            let dots = [];
            let j = 0;
            for (let item of this.state.events[key]) {
                if (this.formattedString(this.state.selected) === key) {
                    dots.push({key: key + '_' + j, color: this.colors[i % this.colors.length], selected: true, selectedDotColor: 'red'})
                } else {
                    dots.push({key: key + '_' + j, color: this.colors[i % this.colors.length]})
                }
                j++;
                i++;
            }

            eventMarkers[key].dots = dots;
        }
        console.log(eventMarkers);
        return eventMarkers;
    }

    subtractMonth() {
        this.setState(prevState => ({
            selected: prevState.selected.add(-1, 'month')
        }), console.log('updated:', this.formattedString(this.state.selected)));
    }

    addMonth() {
        this.setState(prevState => ({
            selected: prevState.selected.add(1, 'month')
        }), console.log('updated:', this.formattedString(this.state.selected)));
    }

    formattedString(moment) {
        return moment.format('YYYY-MM-DD');
    }

    setSelected(dateString) {
        this.setState({
            selected: moment(dateString, "YYYY-MM-DD")
        }, console.log('selected set:', this.formattedString(this.state.selected)));
    }

    async openDatePicker (){
        if (Platform.OS === 'ios'){

        } else {
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: new Date()
                });
                console.log(action, year, month, day);
                if (action === 'dateSetAction'){
                    // Looks like month is 0-indexed
                    this.setSelected(`${year}-${month + 1}-${day}`);
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
            }
        }

    }

    render() {

        console.log(this.formattedString(this.state.selected));
        /*
           Reference for react-native-calendars: https://github.com/wix/react-native-calendars
         */

        LocaleConfig.locales['no'] = {
            monthNames: ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','October','November','Desember'],
            monthNamesShort: ['Jan.','Feb.','Mars','April','Mai','Juni','Juli.','Aug.','Sept.','Okt.','Nov.','Des.'],
            dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
            dayNamesShort: ['Søn.','Man.','Tir.','Ons.','Tor.','Fre.','Lør.']
        };

        LocaleConfig.defaultLocale = 'no';

        let calendar = null;

        if (this.state.view === 'Calendar') {
            calendar =
                <Calendar
                    current={this.formattedString(this.state.selected)}

                    markedDates={this.generateEventMarkers()}

                    markingType={'multi-dot'}

                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {
                        this.setSelected(day.dateString);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    // TODO: These should probably be handled separately
                    onDayLongPress={(day) => {
                        this.setSelected(day.dateString)
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {
                        console.log('month changed', month);
                        this.setSelected(month.dateString);
                    }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={false}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={false}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={this.subtractMonth}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={this.addMonth}
                />;
        } else if (this.state.view === 'Agenda') {
            calendar =
                <Agenda
                    firstDay={1}
                    // the list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key kas to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    items={this.state.events}
                    // callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={(month) => {console.log('trigger items loading')}}
                    // callback that fires when the calendar is opened or closed
                    onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
                    // callback that gets called on day press
                    onDayPress={(day)=>{console.log('day pressed')}}
                    // callback that gets called when day changes while scrolling agenda list
                    onDayChange={(day)=>{console.log('day changed')}}
                    // initially selected day
                    selected={'2018-10-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2018-10-01'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2018-10-07'}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => {
                        console.log(item);
                        return (
                            <View style={[styles.item, {height: item.height}]}><Text>{item.text}</Text></View>
                        );
                    }}
                    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                    renderDay={(day, item) => {
                        console.log('day: ', day);
                        console.log('item: ', item);
                        if (item){
                            return(
                                <View><Text>{day ? day.day: 'a'}</Text></View>
                            )
                        }
                        return undefined;
                    }}
                    // specify how empty date content with no items should be rendered
                    renderEmptyDate={() => {return (<View style={styles.emptyDate}><Text>This is empty date!</Text></View>);}}
                    // specify how agenda knob should look like
                    renderKnob={() => {return ( <View />);}}
                    // specify what should be rendered instead of ActivityIndicator
                    renderEmptyData = {() => {return (<View />);}}
                    // specify your item comparison function for increased performance
                    rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}

                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                    onRefresh={() => console.log('refreshing...')}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                    refreshControl={null}
                    // agenda theme
                    theme={{
                        agendaDayTextColor: 'yellow',
                        agendaDayNumColor: 'green',
                        agendaTodayColor: 'red',
                        agendaKnobColor: 'blue'
                    }}
                    // agenda container style
                    style={{}}
                />;
        }

        return (
            <View style={styles.container}>
                {calendar}
                <Button
                    onPress={this.openDatePicker}
                    title="Open date picker"
                    color="#841584"
                    accessibilityLabel="Open the date picker"
                />
                <DayView day={this.state.selected.format('Do')}
                         events={this.state.events[this.formattedString(this.state.selected)]}
                         dayName={this.state.selected.format('dddd')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});
