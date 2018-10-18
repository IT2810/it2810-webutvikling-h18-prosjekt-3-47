import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Geolocation from '../components/Geolocation';

export default class GeolocationScreen extends React.Component {
  static navigationOptions = {
    title: 'Geolocation',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Geolocation />;
  }
}
