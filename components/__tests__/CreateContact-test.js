import 'react-native';
import React from 'react';
import CreateContact from '../Contacts/CreateContact';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

let shallowRenderer = new ShallowRenderer();

let contacts = [
    {
        name: "Navn Navnesen 1",
        phoneNumber: 12345678,
        address: "Adresse 1"
    }
];


it('renders correctly', () => {
    const tree = renderer.create(<CreateContact callback={null} popupDialog={null} />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders shallow correctly', () => {
    shallowRenderer.render(<CreateContact callback={null} popupDialog={null} />);
    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
});
