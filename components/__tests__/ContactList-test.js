import 'react-native';
import React from 'react';
import ContactList from '../Contacts/ContactList';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('../Contacts/DisplayContact');

const contacts = [
    {
        name: "Navn Navnesen 1",
        phoneNumber: 12345678,
        address: "Adresse 1"
    },
    {
        name: "Navn Navnesen 2",
        phoneNumber: 87654321,
        address: "Adresse 2"
    }
];

it('renders correctly', () => {
    const tree = renderer.create(<ContactList contacts={contacts} />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders shallow correctly', () => {
    let shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<ContactList contacts={contacts} />);
    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
});
