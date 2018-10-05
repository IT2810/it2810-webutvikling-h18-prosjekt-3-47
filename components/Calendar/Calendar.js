/**
 * CalendarComponent keeps track of the current and selected days, retrieves events from AsyncStorage, and displays a
 * Calendar from react-native-calendars with the events it received.
 * TODO: Update this text
 */
import React from 'react';
import {StyleSheet, Text, View, Button, DatePickerAndroid, Platform, AsyncStorage} from 'react-native';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import DayView from './DayView'
import CalendarEntryInput from './CalendarEntryInput'
import moment from 'moment';
import 'moment/locale/nb';

export default class CalendarComponent extends React.Component {

    colors = ['green', 'blue', 'grey', 'orange', 'salmon', 'red'];
    df = 'YYYY-MM-DD';

    constructor (props){
        super(props);

        // Setting moment locale.
        moment.locale('nb');

        // Setting react-native-calendars locales
        LocaleConfig.locales['no'] = {
            monthNames: ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
            monthNamesShort: ['Jan.','Feb.','Mars','April','Mai','Juni','Juli.','Aug.','Sept.','Okt.','Nov.','Des.'],
            dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
            dayNamesShort: ['Søn.','Man.','Tir.','Ons.','Tor.','Fre.','Lør.']
        };
        LocaleConfig.defaultLocale = 'no';

        this.state = {
            now: moment(), // now
            selected: moment(), // now
            events: {},
            eventMarkers: {},
            modalVisible: false
        };

        // Binding `this`
        this.subtractMonth = this.subtractMonth.bind(this);
        this.addMonth = this.addMonth.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
        this.generateEventMarkers = this.generateEventMarkers.bind(this);
        this.receiveNewEntry = this.receiveNewEntry.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }

    /**
     * Retrieves event data from AsyncStorage, updates state on success.
     * @return {Promise<void>}
     * @private
     */
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('events');
            if (value !== null) {
                // Success

                this.setState(() => ({
                    events: JSON.parse(value)
                }));
            }
        } catch (error) {
            console.error('Error reading from AsyncStorage', error);
        }
    };

    // Just placeholder events
    events = {
        '2018-10-02': [{text: 'Møte med Per'}],
        '2018-10-03': [{text: 'Møte med Pål'}],
        '2018-10-04': [],
        '2018-10-05': [{text: 'Møte med Espen'},{text: 'Møte med Jens'}, {text: 'Møte med Siri'},{text: 'Møte med Gunvor'}],
        '2018-11-02': [{text: 'Møte med Arild'}]
    };

    /**
     * Stores data to AsyncStorage
     * FIXME
     * @return {Promise<void>}
     * @private
     */
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('events', JSON.stringify(this.events));
            console.log('Wrote to AsyncStorage');
        } catch (error) {
            console.error('Error storing to AsyncStorage', error);
        }
    };

    /** Synchronous
     * Returns an array of all dates in the month of the given date.
     * @param date <object> moment.js object
     * @return {Array} with strings
     */
    getDaysInMonth(date) {
        let days = [];

        let day = moment(date.format('YYYY-MM'), 'YYYY-MM');
        while (day.format('MM') === date.format('MM')) {
            days.push(day.format(this.df));
            day.add(1, 'day');
        }
        return days;
    }

    /**
     * Synchronous
     * The react-native-calendar expects markers in a certain format, and it does not consider dates as loaded unless
     * there is an entry for it in markedDates. Therefore, this function generates empty entries for dates that do not
     * have any events. Dates that has events in `events`, will have an entry with `dots` for the chosen events.
     *
     * Counts i to keep dot colors somewhat separate, using modulo to keep the color within array bounds
     *
     * @param events <object> date string as keys
     * @return eventMarkers <object> date string as keys
     */
    generateEventMarkers(events) {
        let eventMarkers = {};
        let i = 0; // Counter to keep colours somewhat different

        // Generate entry for all dates in selected month
        for (let key of this.getDaysInMonth(this.state.selected)){
            eventMarkers[key] = {};  // ex: eventMarkers = {'2018-09-03': {} }
            if(this.state.selected.format(this.df) === key) {
                eventMarkers[key].selected = true;
            }

            let dots = [];

            // Add marker dots for the events that are in `events`
            if (events.hasOwnProperty(key)){
                events[key].forEach(()=> {
                    dots.push({color: this.colors[i % this.colors.length]});
                    i++;
                });
            }

            // Add dots to eventMarker for given date
            eventMarkers[key].dots = dots;
        }

        return eventMarkers;
    }


    /**
     * Checks if eventMarkers are initialised. Makes a copy of `this.state.eventMarkers`, with changes on the
     * previously selected date entry and the new selected date entry.
     * Copies in order to not mutate the current state, which will be prevState after the results are set to `state`.
     * Mutating objects in state could lead to trouble as you are essentially rewriting history, and making later
     * comparisons based on prevState very difficult.
     * @param prevSelected <string> date string on format specified in `this.df` of the previously selected date.
     * @return {*} object if eventMarkers is initialised. Else `null`
     */
    updateEventMarkerSelected(prevSelected) {
        // In case eventMarkers aren't initialised
        if (this.state.eventMarkers){
            // Generating a copy, in order to not mutate the values in `state`
            return Object.assign({}, this.state.eventMarkers, {
                [prevSelected]: {
                    selected: false
                },
                [this.state.selected.format(this.df)]: {
                    selected: true
                }
            });
        }
        return null;
    }

    /**
     * Asynchronous
     * Sets state.selected as one month earlier. Copying in order to not mutate prevState
     */
    subtractMonth() {
        this.setState(prevState => ({
            selected: this.dateCopy(prevState.selected).subtract(1, 'month')
        }), console.log('updated, subtracted from selected month:', this.state.selected.format(this.df)));
    }

    /**
     * Asynchronous
     * Sets state.selected as one month later. Copying in order to not mutate prevState
     */
    addMonth() {
        this.setState(prevState => ({
            selected: this.dateCopy(prevState.selected).add(1, 'month')
        }), console.log('updated, subtracted from selected month:', this.state.selected.format(this.df)));
    }

    /**
     * Synchronous
     * Creates a copy of the date that can be mutated without mutating the original date object
     * @param date <object> Moment.js date
     * @return {*|moment.Moment}
     */
    dateCopy(date) {
        return moment(date.format(this.df), this.df)
    }

    /**
     * Asynchronous
     * Sets selected date in state to a moment object of the given dateString
     * @param dateString <string>
     * @param callback <function> to be called after setState is finished
     */
    setSelected(dateString, callback) {
        this.setState({
            selected: moment(dateString, this.df)
        }, () => {
            console.log('updated, selected set:', this.state.selected.format(this.df));
            if (callback) {callback()}
        });
    }

    /**
     * Asynchronous
     * Opens a date picker if it runs on Android. If a date was set by the user, it updates the selected date in month
     *
     * TODO: Date picker for iOS
     * @return {Promise<void>}
     */
    async openDatePicker (callback){
        if (Platform.OS === 'ios'){

        } else {
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: new Date()
                });
                if (action === 'dateSetAction'){
                    // Looks like month is 0-indexed
                    let newDate = moment(`${year}-${month + 1}-${day}`, 'YYYY-M-D').format(this.df);
                    callback(newDate);
                }
            } catch ({code, message}) {
                console.warn('Something went wrong with the date picker', message);
            }
        }

    }

    /**
     * Runs on first 'mount' (first render). Asynchronous call to receive data,
     * will update state and re-render on success.
     */
    componentDidMount() {
        /*
        this._storeData().then(() => {
            this._retrieveData()
        });
        */

        // Asynchronous call to AsyncStorage to retrieve events that are stored there. Updates state on success.
        this._retrieveData()
    }


    /**
     * Runs every time the component is updated.
     * Generates new markers if new events are received or month and/or year changed.
     * Updating markers if only date changed.
     * If there was any updates, these are set in the end. Ended up with this solution in case more values might be
     * changed from here.
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate!!!!');
        let toUpdate = {};

        if (prevState.events !== this.state.events){
            // New events received
            toUpdate.eventMarkers = this.generateEventMarkers(this.state.events);

        } else if (prevState.selected.format(this.df) !== this.state.selected.format(this.df)){
            // Selected date changed
            if (prevState.selected.format('YYYY-MM') !== this.state.selected.format('YYYY-MM')){
                // Month change (Month and/or year changed)
                toUpdate.eventMarkers = this.generateEventMarkers(this.state.events);

            } else {
                // Only day in month changed
                let newEventMarkers = this.updateEventMarkerSelected(prevState.selected.format(this.df));
                if (newEventMarkers) {
                    toUpdate.eventMarkers = newEventMarkers;
                }
            }
        }


        // This approach is probably not needed, but could be useful if more things might need to be updated.
        if (Object.keys(toUpdate).length !== 0) {
            console.log('Something to update');
            this.setState(toUpdate);

        } else console.log('Nothing to update');
    }

    receiveNewEntry(calendarEntry) {
        console.log(calendarEntry);
    }

    render() {

        console.log('rendering', this.state.selected.format(this.df));

        // Reference for react-native-calendars: https://github.com/wix/react-native-calendars

        return (
            <View style={styles.container}>
                <Calendar
                    current={this.state.selected.format(this.df)}

                    markedDates={this.state.eventMarkers}

                    markingType={'multi-dot'}

                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {
                        this.setSelected(day.dateString);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {
                        this.setSelected(day.dateString, this.modal._toggleModal);
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
                    onPress={() => {this.openDatePicker(this.setSelected)}}
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
                         events={this.state.events[this.state.selected.format(this.df)]}
                         dayName={this.state.selected.format('dddd')}
                />

                <CalendarEntryInput
                    ref={instance => { this.modal = instance; }}
                    callback={this.receiveNewEntry}
                    openDatePicker={this.openDatePicker}
                    defaultDate={this.state.selected}
                    isModalVisible={this.state.modalVisible}
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
        // TODO: The buttons really need some styling
    }
});