/**
 * CalendarComponent keeps track of the current and selected days, retrieves events from AsyncStorage, and displays a
 * Calendar from react-native-calendars with the events it received.
 * Uses moment.js to work with dates, makes formatting and incrementing a bit easier
 * Instantiates a DayView that displays the current date and the events on that date, if any
 */
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import DayView from './DayView'
import CalendarEntryInput from './CalendarEntryInput'
import moment from 'moment';
import 'moment/locale/nb'; // Importing nb locale for moment.js
import DateTimePicker from 'react-native-modal-datetime-picker';
import df from '../../constants/DateFormats' // Importing project date format constants
import lc from '../../constants/Locale' // Importing project locale constants
import c from '../../constants/Colors'

export default class CalendarComponent extends React.Component {


    constructor (props){
        super(props);

        // Setting moment locale with project locale constant
        moment.locale(lc.languageCode);

        // Setting react-native-calendars locale with project locale constants
        LocaleConfig.locales[lc.languageCode] = lc.reactNativeCalendarsLocale;
        LocaleConfig.defaultLocale = lc.languageCode;

        this.state = {
            now: moment(), // now
            selected: moment(), // now
            events: {},
            eventMarkers: {},
            modalVisible: false,
            isDateTimePickerVisible: false
        };

        // Binding `this`
        this.subtractMonth = this.subtractMonth.bind(this);
        this.addMonth = this.addMonth.bind(this);
        this.generateEventMarkers = this.generateEventMarkers.bind(this);
        this.receiveNewEntry = this.receiveNewEntry.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.handleDatePicked = this.handleDatePicked.bind(this);
        this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
        this.showDateTimePicker= this.showDateTimePicker.bind(this);
    }

    /**
     * Asynchronous, with calls to AsyncStorage and setState
     * Retrieves event data from AsyncStorage, updates state on success.
     * @return {Promise<void>}
     */
    async retrieveEvents() {
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

    /**
     * Asynchronous with call to AsyncStorage
     * Stores the provided data to AsyncStorage at the provided path.
     * @param path <string> The path in AsyncStorage where the data should be set
     * @param data <object> The data that should be stored
     * @return {Promise<void>}
     */
    async storeData(path, data) {
        try {
            await AsyncStorage.setItem(path, JSON.stringify(data));
        } catch (error) {
            console.error('Error storing to AsyncStorage', error);
        }
    };

    /**
     * Synchronous
     * Returns an array of all dates in the month of the given date.
     * @param date <object> moment.js object
     * @return {Array} with strings
     */
    getDaysInMonth(date) {
        let days = [];

        let day = moment(date.format('YYYY-MM'), 'YYYY-MM');
        while (day.format('MM') === date.format('MM')) {
            days.push(day.format(df.defaultDate));
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
            if(this.state.selected.format(df.defaultDate) === key) {
                eventMarkers[key].selected = true;
            }

            let dots = [];

            // Add marker dots for the events that are in `events`
            if (events.hasOwnProperty(key)){
                events[key].forEach(()=> {
                    dots.push({color: c.safeColorList[i % c.safeColorList.length]});
                    i++;
                });
            }

            // Add dots to eventMarker for given date
            eventMarkers[key].dots = dots;
        }

        return eventMarkers;
    }

    /**
     * Synchronous
     * Checks if eventMarkers are initialised. Makes a copy of `this.state.eventMarkers`, with changes on the
     * previously selected date entry and the new selected date entry.
     * Copies in order to not mutate the current state, which will be prevState after the results are set to `state`.
     * Mutating objects in state could lead to trouble as you are essentially rewriting history, and making later
     * comparisons based on prevState very difficult.
     * @param prevSelected <string> date string on format specified in `df.defaultDate` of the previously selected date.
     * @return {*} object if eventMarkers is initialised. Else `null`
     */
    updateEventMarkerSelected(prevSelected) {
        // In case eventMarkers aren't initialised
        if (this.state.eventMarkers){
            // Generating a copy, in order to not mutate the values in `state`
            return Object.assign({}, this.state.eventMarkers, {
                [prevSelected]: {
                    selected: false,
                    dots: this.state.eventMarkers[prevSelected].dots
                },
                [this.state.selected.format(df.defaultDate)]: {
                    selected: true,
                    dots: this.state.eventMarkers[this.state.selected.format(df.defaultDate)].dots
                }
            });
        }
        return null;
    }

    /**
     * Asynchronous call to setState
     * Sets state.selected as one month earlier. Copying in order to not mutate prevState
     */
    subtractMonth() {
        this.setState(prevState => ({
            selected: this.dateCopy(prevState.selected).subtract(1, 'month')
        }));
    }

    /**
     * Asynchronous call to setState
     * Sets state.selected as one month later. Copying in order to not mutate prevState
     */
    addMonth() {
        this.setState(prevState => ({
            selected: this.dateCopy(prevState.selected).add(1, 'month')
        }));
    }

    /**
     * Synchronous
     * Creates a copy of the date that can be mutated without mutating the original date object
     * @param date <object> Moment.js date
     * @return {*|moment.Moment}
     */
    dateCopy(date) {
        return moment(date.format(df.defaultDate), df.defaultDate)
    }

    /**
     * Asynchronous call to setState
     * Sets selected date in state to a moment object of the given dateString
     * @param dateString <string>
     * @param callback <function> to be called after setState is finished
     */
    setSelected(dateString, callback) {
        this.setState({
            selected: moment(dateString, df.defaultDate)
        }, () => {
            if (callback) {
                if (typeof(callback) === 'function'){
                    callback()
                } else {
                    console.warn('`callback` argument given to setSelected is not a function! \n' +
                        'expected type: function \n' +
                        'actual type: ' + typeof callback
                    )
                }
            }
        });
    }

    /**
     * Asynchronous call to retrieveEvents
     * Runs on first 'mount' (first render). Asynchronous call to receive data,
     * will update state and re-render on success.
     */
    componentDidMount() {
        // Asynchronous call to AsyncStorage to retrieve events that are stored there. Updates state on success.
        this.retrieveEvents();

        /*  // Uncomment to write example events to AsyncStorage
        const exampleEvents = {
            '2018-10-02': [{text: 'Møte med Per'}],
            '2018-10-03': [{text: 'Møte med Pål'}],
            '2018-10-08': [],
            '2018-10-15': [{text: 'Møte med Espen'},{text: 'Møte med Jens'}, {text: 'Møte med Siri'},{text: 'Møte med Gunvor'}],
            '2018-10-23': [{text: 'Møte med Trump'}, {text: 'Tur til Rockheim med Erna Solberg'}],
            '2018-11-08': [{text: 'Møte med Barack Obama'}],
            '2018-11-31': [{text: 'Kaffe med Per Sandberg'}],
            '2018-12-24': [{text: 'Julefeiring med Rune Øygard'}]
        };
        this.storeData('events', exampleEvents).then(() => {
            console.log('Wrote example events to AsyncStorage');
            this.retrieveEvents();
        });
        */

        
        /*  // Uncomment to clear AsyncStorage
        this.storeData('events', null);
        */
    }

    /**
     * Asynchronous call to setState
     * Runs every time the component is updated.
     * Generates new markers for the selected month if new events are received or month and/or year changed.
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

        } else if (prevState.selected.format(df.defaultDate) !== this.state.selected.format(df.defaultDate)){
            // Selected date changed
            if (prevState.selected.format('YYYY-MM') !== this.state.selected.format('YYYY-MM')){
                // Month change (Month and/or year changed)
                toUpdate.eventMarkers = this.generateEventMarkers(this.state.events);

            } else {
                // Only day in month changed
                let newEventMarkers = this.updateEventMarkerSelected(prevState.selected.format(df.defaultDate));
                // console.log('old event markers:', this.state.eventMarkers);
                // console.log('updated event markers:', newEventMarkers);
                if (newEventMarkers) {
                    toUpdate.eventMarkers = newEventMarkers;
                }
            }
        }


        // This approach is probably not needed, but could be useful if more things might need to be updated.
        if (Object.keys(toUpdate).length !== 0) {
            //console.log('Something to update');
            this.setState(toUpdate);

        }
        // else console.log('Nothing to update');
    }

    /**
     * Checking against new incoming state to determine if the component should update or not.
     * Will prevent the component from re-rendering if the day is not changed.
     * Will not re-render if eventMarkers or modalVisible changes, as those are passed down to Calendar and Modal,
     * respectively.
     * For some reason DateTimePicker does not re-render when isDateTimePickerVisible changes,
     * so I had to re-render when this updates.
     *
     * @param nextProps <object>
     * @param nextState <object>
     * @return {boolean} if component should update or not
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextState.selected.format(df.defaultDate) !== this.state.selected.format(df.defaultDate) ||
            nextState.events !== this.state.events ||
            nextState.eventMarkers !== this.state.eventMarkers ||
            nextState.isDateTimePickerVisible !== this.state.isDateTimePickerVisible
        )
    }

    /**
     * Asynchronous call to retrieveEvents
     * Copies `this.state.events` to avoid mutation of the state.
     * Merges the received entry into the copy, and sets the state with the new events object.
     * @param calendarEntry <object> contains dateString and text, both are strings.
     */
    receiveNewEntry(calendarEntry) {
        let eventsCopy = Object.assign({}, this.state.events);

        if (Array.isArray(eventsCopy[calendarEntry.dateString])) {
            eventsCopy[calendarEntry.dateString].push({
                text: calendarEntry.text
            })
        } else {
            eventsCopy[calendarEntry.dateString] = [{ text: calendarEntry.text }];
        }

        this.storeData('events', eventsCopy).then(() => {
            console.log('Wrote events to AsyncStorage.');
            this.retrieveEvents();
        });
    }

    /**
     * Updates state to show date picker
     */
    showDateTimePicker(){
        this.setState({ isDateTimePickerVisible: true });
    }

    /**
     * Updates state to hide date picker
     */
    hideDateTimePicker() {
        this.setState({ isDateTimePickerVisible: false });
    }

    /**
     * Sent as a callback function to react-native-modal-datetime-picker. Is called whenever a date has been chosen.
     * This function hides the picker, and updates the state.
     *
     * @param date <object> JS Date Object sent from react-native-modal-datetime-picker
     */
    handleDatePicked(date) {
        this.setSelected(moment(date).format(df.defaultDate));
        this.hideDateTimePicker();
    }

    render() {

        // console.log('rendering', this.state.selected.format(df.defaultDate));

        // Reference for react-native-calendars: https://github.com/wix/react-native-calendars

        return (
            <View style={styles.container}>
                <Calendar
                    // Initially visible month. Default = Date()
                    current={this.state.selected.format(df.defaultDate)}
                    // Collection of dates that have to be marked. Default = {}
                    markedDates={this.state.eventMarkers}
                    // How the marked dates are displayed in the calendar
                    markingType={'multi-dot'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {
                        this.setSelected(day.dateString);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {
                        this.setSelected(day.dateString, this.modal.requestShowModal);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={df.monthNameAndYear}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left.
                    onPressArrowLeft={this.subtractMonth}
                    // Handler which gets executed when press arrow icon left.
                    onPressArrowRight={this.addMonth}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.showDateTimePicker();
                    }}
                    accessibilityLabel='Åpne datovelgeren'>
                    <Text style={styles.buttonText}>Åpne datovelgeren</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.setSelected(moment().format(df.defaultDate))}}
                    accessibilityLabel='Sett kalenderen til i dag'>
                    <Text style={styles.buttonText}>I dag</Text>
                </TouchableOpacity>
                <CalendarEntryInput style={styles.calendarEntryInput}
                    ref={instance => { this.modal = instance; }} // To be able to toggle the modal on day long press
                    callback={this.receiveNewEntry}
                    defaultDate={this.state.selected}
                />
                <DayView date={this.state.selected}
                         events={this.state.events[this.state.selected.format(df.defaultDate)]}
                />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    cancelTextIOS='Avbryt'
                    confirmTextIOS='Velg'
                    titleIOS='Velg en dato'
                    locale='nb'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c.appMainBackground,
    },
    item: {
        backgroundColor: c.appMainBackground,
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
        flex: 0,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20
    },
    calendarEntryInput: {
        height: 10
    }
});
