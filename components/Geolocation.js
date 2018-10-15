import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    PermissionsAndroid,
} from 'react-native';


import MapView from 'react-native-maps'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


//let id = 0;

export default class Geolocation extends Component{
    
    constructor(props){
        super(props);
        /*
        let watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({
                markers: [
                    ...this.state.markers, {
                        coordinate: position.coords,
                        key: id++
                    }
                ]
            }, null, {distanceFilter: 10});
        });*/

        //this.state = {markers: [], watchID};
        this.state = {
            initialRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    requestLocationPermission = async () => {
            const success = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if(success) {
                this.getCurrentPosition();
                return;
            }
            try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    'title': 'Location premission',
                    'message': 'Add me.'
                  }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log("You can use the camera")
                  this.getCurrentPosition();
      
                } else {
                  console.log("Camera permission denied")
                }
              } catch (err) {
                console.warn(err)
              }
      }

      getCurrentPosition = () => {
        navigator.geolocation.watchPosition(
            (position) => {
                const initialRegion = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0, // position.coords.latitudeDelta,
                    longitudeDelta: 0, // position.coords.longitudeDelta,
                };
                this.setState({
                    initialRegion: initialRegion,
                    error: null,
                });
              //this.setState({initialRegion: initialRegion});
              //this.setState({markerPosition: initialRegion});
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
      }


    componentWillUnmount(){
        navigator.geolocation.stopWatch(this.state.watchID)
    }
    
    watchID = null;    

    componentDidMount() {
        //Finner vår første posisjon
        this.requestLocationPermission();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    
    render(){
        return(
            <View style= {StyleSheet.container}>
                
                <MapView //lager kartet
                    style = {styles.map}
                    region = {this.state.initialRegion}>

                    {this.state.markers}
                    {/*this.state.markers.map((marker) => (<MapView.Marker
                        coordinate = {marker.coordinate}
                    /> ))*/}
                    <MapView.Marker
                        coordinate = {this.state.initialRegion}
                    />
                </MapView>
            </View>
        )
    }

    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    map:{
        position: 'absolute',
        top: 50,
        width: width,
        height: height - 100
    }
});
