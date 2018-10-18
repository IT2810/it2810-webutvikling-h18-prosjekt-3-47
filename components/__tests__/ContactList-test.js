import 'react-native';
import React from 'react';
import ContactList, {mockOpenContact} from '..Contacts/ContactList';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import * as jest from "react-native";

jest.mock('../ContactList');

let shallowRenderer = new ShallowRenderer();

let contacts = [
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


beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ContactList.mockClear();
    mockOpenContact.mockClear();
});

it('renders correctly', () => {
    const tree = renderer.create(<ContactList contacts={this.contacts} />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders shallow correctly', () => {
    shallowRenderer.render(<ContactList contacts={this.contacts} />);
    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
});

test('openContact', () => {
    let contactList = new ContactList(contacts[0]);
    expect(contactList.state.contact).toBeNull();

    let contact = contacts[1];
    contactList.openContact(contact);
    expect(contactList.state.contact).toEqual(contact);
});