import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/nb';

export default class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Calendar',
    };
    constructor (props){
        super(props);

        // Moment locale reference: http://momentjs.com/docs/#/i18n/adding-locale/
        moment.locale('nb');

        this.state = {
            view: 'Calendar',
            now: moment(),
            selected: moment()
        };

        this.subtractMonth = this.subtractMonth.bind(this);
        this.addMonth = this.addMonth.bind(this);
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

        if (this.state.view === 'Calendar') {
            return (
                <Calendar
                    current={this.formattedString(this.state.selected)}
                        // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {
                        this.setSelected(day.dateString)
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
                />
            );
        }
            /*

            else if (this.state.view === 'Agenda') {
            return (
                <Agenda
                    // the list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key kas to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    items={
                        {'2012-05-22': [{text: 'item 1 - any js object'}],
                            '2012-05-23': [{text: 'item 2 - any js object'}],
                            '2012-05-24': [],
                            '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
                        }}
                    // callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={(month) => {console.log('trigger items loading')}}
                    // callback that fires when the calendar is opened or closed
                    onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
                    // callback that gets called on day press
                    onDayPress={(day)=>{console.log('day pressed')}}
                    // callback that gets called when day changes while scrolling agenda list
                    onDayChange={(day)=>{console.log('day changed')}}
                    // initially selected day
                    selected={'2012-05-16'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2012-05-30'}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => {return (<View />);}}
                    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                    renderDay={(day, item) => {return (<View />);}}
                    // specify how empty date content with no items should be rendered
                    renderEmptyDate={() => {return (<View />);}}
                    // specify how agenda knob should look like
                    renderKnob={() => {return (<View />);}}
                    // specify what should be rendered instead of ActivityIndicator
                    renderEmptyData = {() => {return (<View />);}}
                    // specify your item comparison function for increased performance
                    rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                    // Hide knob button. Default = false
                    hideKnob={true}
                    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                    markedDates={{
                        '2012-05-16': {selected: true, marked: true},
                        '2012-05-17': {marked: true},
                        '2012-05-18': {disabled: true}
                    }}
                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                    onRefresh={() => console.log('refreshing...')}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                    refreshControl={null}
                    // agenda theme
                    theme={{
                        ...calendarTheme,
                        agendaDayTextColor: 'yellow',
                        agendaDayNumColor: 'green',
                        agendaTodayColor: 'red',
                        agendaKnobColor: 'blue'
                    }}
                    // agenda container style
                    style={{}}
                />
            )
        }
             */

            else return null
    }
}
