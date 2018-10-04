import React from 'react';
import {StyleSheet, View, Button, DatePickerAndroid, Platform, AsyncStorage} from 'react-native';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import DayView from './DayView'
import moment from 'moment';
import 'moment/locale/nb';

export default class CalendarComponent extends React.Component {

    colors = ['green', 'blue', 'grey', 'orange', 'salmon', 'red'];
    df = 'YYYY-MM-DD';

    constructor (props){
        super(props);

        // Moment locale reference: http://momentjs.com/docs/#/i18n/adding-locale/
        moment.locale('nb');

        this.state = {
            now: moment(),
            selected: moment(),
            events: {},
            eventMarkers: {}
        };

        this.subtractMonth = this.subtractMonth.bind(this);
        this.addMonth = this.addMonth.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
        this.generateEventMarkers = this.generateEventMarkers.bind(this);
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('events');
            if (value !== null) {
                console.log('We have data!!');

                this.setState(() => ({
                    events: JSON.parse(value)
                }));
            }
        } catch (error) {
            console.error('Error reading from AsyncStorage', error);
        }
    };

    events = {
        '2018-10-02': [{text: 'Møte med Per'}],
        '2018-10-03': [{text: 'Møte med Pål'}],
        '2018-10-04': [],
        '2018-10-05': [{text: 'Møte med Espen'},{text: 'Møte med Jens'}, {text: 'Møte med Siri'},{text: 'Møte med Gunvor'}],
        '2018-11-02': [{text: 'Møte med Arild'}]
    };

    _storeData = async () => {
        console.log('halo');
        try {
            await AsyncStorage.setItem('events', JSON.stringify(this.events));
            console.log('Wrote to AsyncStorage');
        } catch (error) {
            console.error('Error storing to AsyncStorage', error);
        }
    };

    getDaysInMonth(date) {
        let days = [];

        let day = moment(date.format('YYYY-MM'), 'YYYY-MM');
        while (day.format('MM') === date.format('MM')) {
            days.push(day.format(this.df));
            day.add(1, 'day');
        }
        return days;
    }


    generateEventMarkers(events) {
        let eventMarkers = {};
        let i = 0; // Counter to keep colours somewhat different

        // The calendar only considers dates as loaded if they have an entry in markedDates
        for (let key of this.getDaysInMonth(this.state.selected)){
            eventMarkers[key] = {};
            if(this.formattedString(this.state.selected) === key) {
                eventMarkers[key].selected = true;
            }

            let dots = [];
            let j = 0;

            if (events.hasOwnProperty(key)){
                events[key].forEach(()=> {
                    if (this.formattedString(this.state.selected) === key) {
                        dots.push({key: key + '_' + j, color: this.colors[i % this.colors.length], selected: true})
                    } else {
                        dots.push({key: key + '_' + j, color: this.colors[i % this.colors.length]})
                    }
                    j++;
                    i++;
                });
            }

            eventMarkers[key].dots = dots;
        }
        // console.log(eventMarkers);

        return eventMarkers;
    }

    subtractMonth() {
        this.setState(prevState => ({
            selected: this.dateCopy(prevState.selected).subtract(1, 'month')
        }), console.log('updated, subtracted from selected month:', this.formattedString(this.state.selected)));
    }

    addMonth() {
        this.setState(prevState => ({
            selected: this.dateCopy(prevState.selected).add(1, 'month')
        }), console.log('updated, subtracted from selected month:', this.formattedString(this.state.selected)));
    }

    formattedString(date) {
        return date.format(this.df);
    }

    dateCopy(date) {
        return moment(this.formattedString(date), this.df)
    }

    setSelected(dateString) {
        this.setState({
            selected: moment(dateString, this.df)
        }, console.log('updated, selected set:', this.formattedString(this.state.selected)));
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

    componentDidMount() {
        console.log('helu');
        // Need to write to AsyncStorage on each mount, since it does not persist in dev mode

        this._storeData().then(() => {
            this._retrieveData()
        });
    }


    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate!!!!');
        let toUpdate = {};


        if (prevState.events !== this.state.events){
            // New events received
            console.log('new events received');

            toUpdate.eventMarkers = this.generateEventMarkers(this.state.events);

        } else if (prevState.selected.format(this.df) !== this.state.selected.format(this.df)){
            // Selected date changed

            // TODO: Might add a separate updateEventMarkers here, will be way more efficient
            toUpdate.eventMarkers = this.generateEventMarkers(this.state.events);
        }



        if (Object.keys(toUpdate).length !== 0) {
            console.log('Something to update');
            this.setState(toUpdate);

        } else console.log('Nothing to update');
    }

    render() {

        console.log('rendering', this.formattedString(this.state.selected));
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

        return (
            <View style={styles.container}>
                <Calendar
                    current={this.formattedString(this.state.selected)}

                    markedDates={this.state.eventMarkers}

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

                    /* Seems redundant
                    onMonthChange={(month) => {
                        console.log('month changed', month);
                        this.setSelected(month.dateString);
                    }}
                    */
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
                <Button style={styles.button}
                    onPress={this.openDatePicker}
                    title="Open date picker"
                    color="#841584"
                    accessibilityLabel="Open the date picker"
                />
                <Button style={styles.button}
                    onPress={() => {this.setSelected(moment().format(this.df))}}
                    title="Today"
                    color="#841584"
                    accessibilityLabel="Set calendar to today"
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
    },
    button: {

    }
});
