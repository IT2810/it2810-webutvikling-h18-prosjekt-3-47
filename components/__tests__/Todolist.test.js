import 'react-native';
import React from 'react';
import Todolist from '../Todolist';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const todos = renderer.create(<Todolist />).toJSON();

  expect(todos).toMatchSnapshot();
});

describe( () => {
  beforeAll(() => addTask())
})

test('En todo ble lagt til', () => {
    expect()
})
