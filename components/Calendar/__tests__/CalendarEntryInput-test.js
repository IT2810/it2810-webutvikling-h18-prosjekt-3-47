import 'react-native';
import React from 'react';
import CalendarEntryInput from '../CalendarEntryInput';

import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('react-native-modal-datetime-picker');
// jest.mock('react-native-material-textfield');

const momentMock = {
    format(){return dateString;}
};

const dateString = '2018-02-07';

describe('Rendering', () => {
    it('renders correctly with renderer', () => {
        console.log(momentMock);
        const calendarEntryInput = renderer.create(
            <CalendarEntryInput
                defaultDate={momentMock}
            />);

        expect(calendarEntryInput).toMatchSnapshot();
    });


    it('renders correctly with ShallowRenderer', () => {
        const shallowRenderer = new ShallowRenderer();
        const calendarEntryInput = shallowRenderer.render(<CalendarEntryInput
            defaultDate={momentMock}
        />);

        expect(calendarEntryInput).toMatchSnapshot();
    });
});


describe('Logical', () => {
    it('should have empty state and date prop', () => {

        let calendarEntryInput = renderer.create(
            <CalendarEntryInput callback={(data) => {console.log('callback!! ', data)}}
                                defaultDate={momentMock}
            />
        );
        let calendarEntryInputInstance = calendarEntryInput.getInstance();

        expect(calendarEntryInputInstance.state.newEventText).toEqual('');
        expect(calendarEntryInputInstance.state.newEventDate).toEqual(null);
        expect(calendarEntryInputInstance.state.isModalVisible).toEqual(false);
        expect(calendarEntryInputInstance.state.isDateTimePickerVisible).toEqual(false);
        expect(calendarEntryInputInstance.props.defaultDate.format()).toEqual(dateString);
    });

    it('should open and close Modal', () => {
        let calendarEntryInput = renderer.create(
            <CalendarEntryInput callback={(data) => {console.log('callback!! ', data)}}
                                defaultDate={momentMock}
            />
        );
        let calendarEntryInputInstance = calendarEntryInput.getInstance();

        calendarEntryInputInstance.requestShowModal();
        expect(calendarEntryInputInstance.state.isModalVisible).toEqual(true);

        calendarEntryInputInstance.requestCloseModal();
        expect(calendarEntryInputInstance.state.isModalVisible).toEqual(false);
    });
});


describe('input validation', () => {

    let calendarEntryInput = renderer.create(
        <CalendarEntryInput callback={(data) => {console.log('callback!! ', data)}}
                            defaultDate={momentMock}
        />
    );
    let calendarEntryInputInstance = calendarEntryInput.getInstance();

    it('should not allow pure whitespace', () => {

        expect(calendarEntryInputInstance.validateInput('                  ' +
            '' +
            '' +
            '\n    ', 'submit')
        ).toEqual(false);
    });

    it('should not allow empty string', () => {
        expect(calendarEntryInputInstance.validateInput('', 'submit')).toEqual(false);
    });

    it('should not allow strings with less than three characters', () => {
        expect(calendarEntryInputInstance.validateInput('      dd    ', 'submit')).toEqual(false);
    });

    it('should allow strings over length of two', () => {
        expect(calendarEntryInputInstance.validateInput('      ddd    ', 'submit')).toEqual(true);
    });

    // It only strips leading and trailing whitespace, so this one should be accepted:
    it('should allow strings over length of two', () => {
        expect(calendarEntryInputInstance.validateInput('      å e    ', 'submit')).toEqual(true);
    });
});


describe('callbacks and such', () => {
    it('should get a callback with the correct data', done => {
        const eventText = '     \n\n\n   Aaaassdææaø112-w33a##sdad sdd sd 323 sdsdø ++ +   \n    ';

        function callback(data) {
            expect(data.dateString).toEqual(dateString);
            expect(data.text).toEqual(eventText.trim());
            done();
        }

        let calendarEntryInput = renderer.create(
            <CalendarEntryInput callback={callback}
                                defaultDate={momentMock}
            />
        );

        let calendarEntryInputInstance = calendarEntryInput.getInstance();
        calendarEntryInputInstance.setState({
            newEventText: eventText,
            newEventDate: momentMock
        },() => {
            calendarEntryInputInstance.sendData();
        });
    });
});


