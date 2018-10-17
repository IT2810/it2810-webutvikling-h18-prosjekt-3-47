import {View} from 'react-native';
import React from 'react';
import Calendar from '../Calendar/Calendar';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('react-native-calendars');
jest.mock('moment/locale/nb');

// Return a fixed timestamp when moment().format() is called
jest.mock('moment', () => () => ({format: () => '2018–01–30T12:34:56+00:00'}));
//jest.mock('moment', () => () => ({locale: () => true}));
//jest.mock('moment', () => () => ({toString: () => '2018–01–30T12:34:56+00:00'}));


jest.mock('moment', () => () => ({defineLocale: () => true}));

describe('Calendar Component', () => {


    /*
    it('should render new tasks when they are added', () => {
        const wrapper = shallow(<View />);

        const firstView = wrapper.find('view').at(0);
        const secondView = wrapper.find('view').at(1);

        expect(firstView.props().style.toEqual([styles.container, { paddingBottom: this.state.viewPadding }]));

    });

    */

    it('renders correctly', () => {
        const shallowRenderer = new ShallowRenderer();
        //const renderer = new ShallowRenderer();
        //const todos = renderer.create(<Calendar />);
        const todos = shallowRenderer.render(<Calendar />);

        expect(todos).toMatchSnapshot();
    });

});

