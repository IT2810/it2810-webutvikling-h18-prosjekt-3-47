import 'react-native';
import React from 'react';
import DayView from '../Calendar/DayView';

import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

const momentMock = {
    format(){return '2018-01-01';}
};

describe('Rendering', () => {
    it('renders correctly with renderer', () => {
        const dayView = renderer.create(
            <DayView
                date={momentMock}
                events={[{text: 'Møte med Espen'},{text: 'Møte med Jens'}, {text: 'Møte med Siri'},{text: 'Møte med Gunvor'}]}
            />
        );

        expect(dayView).toMatchSnapshot();
    });


    it('renders correctly with ShallowRenderer empty events array', () => {
        const shallowRenderer = new ShallowRenderer();
        const dayView = shallowRenderer.render(
            <DayView
                date={momentMock}
                events={[]}
            />
        );

        expect(dayView).toMatchSnapshot();
    });



    it('renders correctly with ShallowRenderer with real events in array', () => {
        const shallowRenderer = new ShallowRenderer();
        const dayView = shallowRenderer.render(
            <DayView
                date={momentMock}
                events={[{text: 'Møte med Espen'},{text: 'Møte med Jens'}, {text: 'Møte med Siri'},{text: 'Møte med Gunvor'}]}
            />
        );

        expect(dayView).toMatchSnapshot();
    });


    it('should not crash if events is not array', () => {
        const shallowRenderer = new ShallowRenderer();
        const dayView = shallowRenderer.render(
            <DayView
                date={momentMock}
                events={"ssd jd jdj jdjd jdj "}
            />
        );
        const dayView2 = shallowRenderer.render(
            <DayView
                date={momentMock}
                events={{a: {text: 'Møte med Espen'},b: {text: 'Møte med Jens'}, c: {text: 'Møte med Siri'},d: {text: 'Møte med Gunvor'}}}
            />
        );

        const dayView3 = shallowRenderer.render(
            <DayView
                date={momentMock}
                events={1221213}
            />
        );
        expect(dayView).toMatchSnapshot();
        expect(dayView2).toMatchSnapshot();
        expect(dayView3).toMatchSnapshot();
    });


});
