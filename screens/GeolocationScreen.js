import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Geolocation from '../components/Geolocation';

export default class GeolocationScreen extends React.Component {
  static navigationOptions = {
    title: 'Geolocation',
  };

  render() {
    return <Geolocation />;
  }
}
