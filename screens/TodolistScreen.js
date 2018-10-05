import React from 'react';
import Todolist from '../components/Todolist';

export default class TodolistScreen extends React.Component {
  static navigationOptions = {
    title: 'Todolist',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Todolist />;
  }
}
