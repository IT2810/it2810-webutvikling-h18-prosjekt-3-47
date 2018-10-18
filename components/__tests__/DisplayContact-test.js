import 'react-native';
import React from 'react';
import DisplayContact from '../DisplayContact';
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
    const tree = renderer.create(<DisplayContact contact={this.contacts[0]} />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders shallow correctly', () => {
    shallowRenderer.render(<DisplayContact contact={this.contact[0]} />);
    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
});