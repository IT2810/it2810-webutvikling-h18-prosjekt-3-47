import 'react-native';
import React from 'react';
import DisplayContact from '../Contacts/DisplayContact';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

let shallowRenderer = new ShallowRenderer();

let contacts = {
    contact: {
        name: "Navn Navnesen 1",
        phoneNumber: 12345678,
        address: "Adresse 1"
    }
};


it('renders correctly', () => {
    const tree = renderer.create(<DisplayContact contact={contacts.contact} />).toJSON();

    expect(tree).toMatchSnapshot();
});


it('rendering fails without props', () => {
    expect(() => {renderer.create(<DisplayContact/>)}).toThrow();

});

it('renders shallow correctly', () => {
    shallowRenderer.render(<DisplayContact contact={contacts.contact} />);
    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
});
