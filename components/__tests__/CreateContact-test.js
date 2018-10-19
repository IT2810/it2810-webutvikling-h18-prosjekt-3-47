import 'react-native';
import React from 'react';
import CreateContact from '../Contacts/CreateContact';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock("react-native-popup-dialog");

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

describe('Rendering', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<CreateContact callback={null} popupDialog={null}/>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders shallow correctly', () => {
        shallowRenderer.render(<CreateContact callback={null} popupDialog={null}/>);
        const result = shallowRenderer.getRenderOutput();

        expect(result).toMatchSnapshot();
    });
});

describe('Logical', () => {
    it('should have all information set to null on first render', () => {

        let createContact = renderer.create(<CreateContact callback={null} popupDialog={null}/>);
        let createContactInstance = createContact.getInstance();

        expect(createContactInstance.state.name).toBeNull();
        expect(createContactInstance.state.phoneNumber).toBeNull();
        expect(createContactInstance.state.address).toBeNull();
    });

    it('should clear state with the clearInputs() method', () => {

        let createContact = renderer.create(<CreateContact callback={null} popupDialog={null}/>);
        let createContactInstance = createContact.getInstance();

        let contact = contacts[0];

        createContactInstance.setState({name: contact.name});

        expect(createContactInstance.state.name).toEqual(contact.name);
        expect(createContactInstance.state.phoneNumber).toBeNull();
        expect(createContactInstance.state.address).toBeNull();

        createContactInstance.clearInputs();

        expect(createContactInstance.state.name).toBeNull();
        expect(createContactInstance.state.phoneNumber).toBeNull();
        expect(createContactInstance.state.address).toBeNull();
    });
});

