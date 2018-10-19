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

describe('Rendering', () => {

    it('renders correctly', () => {

        const tree = renderer.create(
            <ContactList contacts={contacts} />).toJSON();

        expect(tree).toMatchSnapshot();
    });


    it('renders shallow correctly', () => {

        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<ContactList contacts={contacts} />);
        const result = shallowRenderer.getRenderOutput();

        expect(result).toMatchSnapshot();
    });
});

describe('Logical', () => {
    it('should have a contact with all information set to null on first render', () => {

        let contactList = renderer.create(<ContactList contacts={contacts} />);
        let contactListInstance = contactList.getInstance();

        expect(contactListInstance.state.contact.name).toBeNull();
        expect(contactListInstance.state.contact.phoneNumber).toBeNull();
        expect(contactListInstance.state.contact.address).toBeNull();
    });

    it('should change state on calling of the openContact(contact) method', () => {

        let contactList = renderer.create(<ContactList contacts={contacts} />);
        let contactListInstance = contactList.getInstance();

        let contact = contacts[0];

        contactListInstance.openContact(contact);

        expect(contactListInstance.state.contact.name).toEqual(contact.name);
        expect(contactListInstance.state.contact.phoneNumber).toEqual(contact.phoneNumber);
        expect(contactListInstance.state.contact.address).toEqual(contact.address);

    });

});


