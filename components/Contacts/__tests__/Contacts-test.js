import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import Contacts from '../Contacts';

jest.mock("react-native-popup-dialog");

let shallowRenderer = new ShallowRenderer();

describe('Rendering', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Contacts />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders shallow correctly', () => {
        shallowRenderer.render(<Contacts />);
        const result = shallowRenderer.getRenderOutput();

        expect(result).toMatchSnapshot();
    });
});


describe('Logical', () => {
    it('should have an empty contact list on first render', () => {

        let contacts = renderer.create(<Contacts />);
        let contactsInstance = contacts.getInstance();

        expect(contactsInstance.state.contacts).toEqual([]);
    });
});
