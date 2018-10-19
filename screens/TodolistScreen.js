import React from 'react';
import Todolist from '../components/Todolist';

export default class TodolistScreen extends React.Component {
  static navigationOptions = {
    title: 'Todolist',
  };

  render() {
    return <Todolist />;
  }
}
