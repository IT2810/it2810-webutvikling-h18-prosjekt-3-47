import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import ContactsScreen from '../ContactsScreen';

jest.mock("react-native-popup-dialog");

let shallowRenderer = new ShallowRenderer();

describe('Rendering', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<ContactsScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders shallow correctly', () => {
        shallowRenderer.render(<ContactsScreen />);
        const result = shallowRenderer.getRenderOutput();

        expect(result).toMatchSnapshot();
    });
});


describe('Logical', () => {
    it('should have an empty contact list on first render', () => {

        let contactsScreen = renderer.create(<ContactsScreen/>);
        let contactsScreenInstance = contactsScreen.getInstance();

        expect(contactsScreenInstance.state.contacts).toEqual([]);
    });
});
