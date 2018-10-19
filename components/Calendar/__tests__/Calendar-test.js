/*
    Have really not been able to mock AsyncStorage

    Used a really long time to mock dates in Moment.js, tried at least a thousand solutions, so I haven't had that
    much time to finish the rest of the tests.
 */

import 'react-native';
import React from 'react';
import Calendar from '../Calendar';
//import MockAsyncStorage from 'mock-async-storage'

import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import moment from "moment";

const dateString = '2018-02-07';

// Mocking new Date() so that all such calls will end up with the same date
beforeAll(() => {
    const DATE_TO_USE = new Date('2017-02-02T12:54:59.218Z');

    const _Date = Date;
    const MockDate = (...args) => {
        switch (args.length) {
            case 0:
                return DATE_TO_USE;
            default:
                return new _Date(...args);
        }
    };
    MockDate.UTC = _Date.UTC;
    MockDate.now = () => DATE_TO_USE.getTime();
    MockDate.parse = _Date.parse;
    MockDate.toString = _Date.toString;
    MockDate.prototype = _Date.prototype;
    global.Date = MockDate;
});

/*
Mocking some components so that I don't end up testing these ones.
They are replaced by mock-elements that get the same props
 */
jest.mock('react-native-calendars');
jest.mock('react-native-modal-datetime-picker');
jest.mock('../CalendarEntryInput');

describe('Rendering', () => {
    it('renders correctly with renderer', () => {
        const calendar = renderer.create(
            <Calendar />);

        expect(calendar).toMatchSnapshot();
    });


    it('renders correctly with ShallowRenderer', () => {
        const shallowRenderer = new ShallowRenderer();
        const calendar = shallowRenderer.render(<Calendar />);

        expect(calendar).toMatchSnapshot();
    });
});

describe('Logical', () => {
    it('should have no events on first render', () => {

        let calendar = renderer.create(<Calendar />);
        let calendarInstance = calendar.getInstance();

        expect(calendarInstance.state.events).toEqual({});
        expect(calendarInstance.state.eventMarkers).toEqual({});
    });

    /* This test will not work unless we can get AsyncStorage mocking to work
    Would like to test retrieveEvents, storeData and receiveNewEntry, but testing these depend on AsyncStorage
    it('should accept new event', () => {

        const newEvent = {
            dateString: '2018-12-24',
            text: 'Julegrøt hos Raymond Johansen'
        };

        let calendar = renderer.create(<Calendar />);
        let calendarInstance = calendar.getInstance();

        expect(calendarInstance.state.events).toEqual({});
        expect(calendarInstance.state.eventMarkers).toEqual({});


        // To make sure that nothing in newEvent is not mutated and therefore making this test invalid
        calendarInstance.receiveNewEntry(JSON.parse(JSON.stringify(newEvent)));

        expect(calendarInstance.state.events).toEqual(newEvent);
    });
    */
});

describe('days in month', () => {

    let calendar = renderer.create(<Calendar />);
    let calendarInstance = calendar.getInstance();

    it('should find the number of days in feb 2018', () => {
        let daysInFeb18 = ["2018-02-01", "2018-02-02", "2018-02-03", "2018-02-04", "2018-02-05", "2018-02-06", "2018-02-07", "2018-02-08", "2018-02-09", "2018-02-10", "2018-02-11", "2018-02-12", "2018-02-13", "2018-02-14", "2018-02-15", "2018-02-16", "2018-02-17", "2018-02-18", "2018-02-19", "2018-02-20", "2018-02-21", "2018-02-22", "2018-02-23", "2018-02-24", "2018-02-25", "2018-02-26", "2018-02-27", "2018-02-28"];

        let result = calendarInstance.getDaysInMonth(moment('2018-02-07', 'YYYY-MM-DD'));
        expect(result.length).toEqual(28);
        expect(result).toEqual(daysInFeb18);
    });

    it('should find the number of days in feb 2016', () => {
        let daysInFeb16 =  ["2016-02-01", "2016-02-02", "2016-02-03", "2016-02-04", "2016-02-05", "2016-02-06", "2016-02-07", "2016-02-08", "2016-02-09", "2016-02-10", "2016-02-11", "2016-02-12", "2016-02-13", "2016-02-14", "2016-02-15", "2016-02-16", "2016-02-17", "2016-02-18", "2016-02-19", "2016-02-20", "2016-02-21", "2016-02-22", "2016-02-23", "2016-02-24", "2016-02-25", "2016-02-26", "2016-02-27", "2016-02-28", "2016-02-29"];

        let result = calendarInstance.getDaysInMonth(moment('2016-02-07', 'YYYY-MM-DD'));
        expect(result.length).toEqual(29);
        expect(result).toEqual(daysInFeb16);
    });
});

describe('event markers', () => {
    const date1 = moment('2018-10-3', 'YYYY-MM-DD');
    const date2 = moment('2018-10-15', 'YYYY-MM-DD');
    const events = {
        '2018-10-02': [{text: 'Møte med Per'}],
        '2018-10-03': [{text: 'Møte med Pål'}],
        '2018-10-08': [],
        '2018-10-15': [{text: 'Møte med Espen'},{text: 'Møte med Jens'}, {text: 'Møte med Siri'},{text: 'Møte med Gunvor'}],
        '2018-10-23': [{text: 'Møte med Trump'}, {text: 'Tur til Rockheim med Erna Solberg'}],
        '2018-11-08': [{text: 'Møte med Barack Obama'}],
        '2018-11-31': [{text: 'Kaffe med Per Sandberg'}],
        '2018-12-24': [{text: 'Julefeiring med Rune Øygard'}]
    };
    const eventMarkers03Oct2018 =  {
        '2018-10-01': { dots: [] },
        '2018-10-02': { dots: [ {color: "blue"}] },
        '2018-10-03': { selected: true, dots: [ {color: "grey"} ] },
        '2018-10-04': { dots: [] },
        '2018-10-05': { dots: [] },
        '2018-10-06': { dots: [] },
        '2018-10-07': { dots: [] },
        '2018-10-08': { dots: [] },
        '2018-10-09': { dots: [] },
        '2018-10-10': { dots: [] },
        '2018-10-11': { dots: [] },
        '2018-10-12': { dots: [] },
        '2018-10-13': { dots: [] },
        '2018-10-14': { dots: [] },
        '2018-10-15': { dots: [{color: "orange"}, {color: "green"}, {color: "salmon"}, {color: "slateblue"}]},
        '2018-10-16': { dots: [] },
        '2018-10-17': { dots: [] },
        '2018-10-18': { dots: [] },
        '2018-10-19': { dots: [] },
        '2018-10-20': { dots: [] },
        '2018-10-21': { dots: [] },
        '2018-10-22': { dots: [] },
        '2018-10-23': { dots: [{color: "red"}, {color: "seagreen"}]},
        '2018-10-24': { dots: [] },
        '2018-10-25': { dots: [] },
        '2018-10-26': { dots: [] },
        '2018-10-27': { dots: [] },
        '2018-10-28': { dots: [] },
        '2018-10-29': { dots: [] },
        '2018-10-30': { dots: [] },
        '2018-10-31': { dots: [] }
    };
    const eventMarkers15Oct2018 =  {
        '2018-10-01': { dots: [] },
        '2018-10-02': { dots: [ {color: "blue"}] },
        '2018-10-03': { selected: false, dots: [ {color: "grey"} ] },
        '2018-10-04': { dots: [] },
        '2018-10-05': { dots: [] },
        '2018-10-06': { dots: [] },
        '2018-10-07': { dots: [] },
        '2018-10-08': { dots: [] },
        '2018-10-09': { dots: [] },
        '2018-10-10': { dots: [] },
        '2018-10-11': { dots: [] },
        '2018-10-12': { dots: [] },
        '2018-10-13': { dots: [] },
        '2018-10-14': { dots: [] },
        '2018-10-15': { selected: true, dots: [{color: "orange"}, {color: "green"}, {color: "salmon"}, {color: "slateblue"}]},
        '2018-10-16': { dots: [] },
        '2018-10-17': { dots: [] },
        '2018-10-18': { dots: [] },
        '2018-10-19': { dots: [] },
        '2018-10-20': { dots: [] },
        '2018-10-21': { dots: [] },
        '2018-10-22': { dots: [] },
        '2018-10-23': { dots: [{color: "red"}, {color: "seagreen"}]},
        '2018-10-24': { dots: [] },
        '2018-10-25': { dots: [] },
        '2018-10-26': { dots: [] },
        '2018-10-27': { dots: [] },
        '2018-10-28': { dots: [] },
        '2018-10-29': { dots: [] },
        '2018-10-30': { dots: [] },
        '2018-10-31': { dots: [] }
    };


    let calendar = renderer.create(<Calendar />);
    let calendarInstance = calendar.getInstance();

    it('should generate event markers for october 03 2018 and then update them to markers for oct 10', () => {

        // Setting a selected date for Calendar and populating the Calendar events
        calendarInstance.setState({
            selected: date1,
            events: events
        }, () => {
            let generatedEventMarkers = calendarInstance.generateEventMarkers(events);
            expect(generatedEventMarkers).toEqual(eventMarkers03Oct2018);

            calendarInstance.setState({
                selected: date2
            }, () => {
                // Checking that the eventMarkers are set in state
                expect(calendarInstance.state.eventMarkers).toEqual(eventMarkers03Oct2018);

                // Generating new event Markers with selectedDate: date2, prevDate: date1 (formatted)
                let updatedEventMarkers = calendarInstance.updateEventMarkerSelected(date1.format('YYYY-MM-DD'));
                // Checking to see that the markers are updated
                expect(updatedEventMarkers).toEqual(eventMarkers15Oct2018);
            })
        });
    });
});


