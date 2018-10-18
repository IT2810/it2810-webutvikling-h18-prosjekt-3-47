/*
    Have really not been able to mock AsyncStorage

    Used a really long time to mock dates in Moment.js, tried at least a thousand solutions, so I haven't had that
    much time to finish the rest of the tests.
 */

import 'react-native';
import React from 'react';
import Calendar from '../Calendar/Calendar';
//import MockAsyncStorage from 'mock-async-storage'

import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

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
jest.mock('../Calendar/CalendarEntryInput');


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

    it('should accept new event', () => {

        let calendar = renderer.create(<Calendar />);
        let calendarInstance = calendar.getInstance();

        expect(calendarInstance.state.events).toEqual({});
        expect(calendarInstance.state.eventMarkers).toEqual({});


        calendarInstance.receiveNewEntry({
            dateString: '2018-12-24',
            text: 'Julegrøt hos Raymond Johansen'
        });

        expect(calendarInstance.state.events).toEqual({});

    });

});
