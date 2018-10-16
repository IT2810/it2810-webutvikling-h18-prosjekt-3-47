import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    PermissionsAndroid,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import MapView from 'react-native-maps'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DISTANCE_THRESHOLD = 0.0001;
const TICK_INTERVAL = 10000;

export default class Geolocation extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            initialRegion: null,
            currentPosition: {
                latitude: 0,
                longitude: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },
            
            //Liste med målene vi ønsker å oppnå
            goals: [
                {
                title: 'Samfundet',
                latitude: 63.422463,
                longitude: 10.395150
            },
            {
                title: 'Gløhaugen',
                latitude: 63.418575,
                longitude: 10.402832
            },
            {
                title: 'Nidarosdomen',
                latitude: 63.426887,
                longitude: 10.396028
            },
            {
                title: 'Festningen',
                latitude: 63.427072,
                longitude: 10.410989
            },

            ],
            //Liste med de besøkte stedene, er tom by default
            visited: [],
            //Dummy data
            visitedTest: [
                {
                    title: 'Dummy',
                    latitude: 63.420443,
                    longitude: 10.399908
                }
            ],
            
        }

        this.tick = this.tick.bind(this);
        this.checkGoals = this.checkGoals.bind(this);
    }


      returnFilteredArray(arr, removeElement) {
          let returnArr = [];

          arr.forEach((elem) => {
              if (elem !== removeElement){
                  returnArr.push(elem)
              }
          });

          return returnArr;
      }

      //Funksjoner som sjekker om vi er i nærheten av målet vårt
      isNearby = (currentPos, goalPos) => {
        if(this.getDistance(currentPos, goalPos) <= 0.0025){
            if(this.state.visited.indexOf(goalPos) < 0){
                
                this.setState(prevState => ({
                    goals: this.returnFilteredArray(prevState.goals, goalPos),
                    visited: prevState.visited.concat(goalPos)
                }));

                
                // TODO: øk poeng
            }
        }
      }
      //Funksjon som returnerer distansen mellom to steder
      getDistance = (pos1,pos2) => {
        let diff = (pos1.latitude-pos2.latitude)**2 + (pos1.longitude-pos2.longitude)**2;
        let distance = Math.sqrt(diff);
        return distance
      }

      //Funksjon som gir poengene til bruker
      getPoints = () => {return userPoints};

      checkGoals() {
          // Iterate through goals, check if they are nearby
          console.log('position updated');
          this.state.goals.forEach((goal) => {
              this.isNearby(this.state.initialRegion, goal);
          })
      }


      getLocationAsync = async (callback) => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);

    

        if (this.state.initialRegion === null) {
            let latLng = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0, // position.coords.latitudeDelta,
                longitudeDelta: 0, // position.coords.longitudeDelta,
            }
            this.setState({
                initialRegion: latLng
            });
        }

        this.setState({ currentPosition: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }}, () => {
            if(callback && typeof callback === 'function'){
                callback();
            }
        });

        
    
        console.log(this.state);
        
        
      };

      tick() {
          // Sending checkGoals as callback
        this.getLocationAsync(this.checkGoals);
      }


    watchID = null;
    componentWillUnmount(){
        navigator.geolocation.stopWatch(this.state.watchID)
    }
    
       

    componentWillMount() {
        //Finner vår første posisjon
        //this.requestLocationPermission();
        this.getLocationAsync();
    }

    componentDidMount() {
        this.tick();
        setInterval(this.tick, TICK_INTERVAL);
    }

    
    render(){
        

        console.log(this.state);

        let markers = [];
        let markersVisited = [];

        for (let i=0; i < this.state.goals.length; i++) {
            markers.push(<MapView.Marker
                key={i}
                coordinate = {this.state.goals[i]}
            />); 
        }

        for(let i = 0; i < this.state.visited.length; i++){
            markersVisited.push(<MapView.Marker
                key={i}
                coordinate = {this.state.visited[i]}
                image={require('../assets/images/checked.png')}
            />);
        }

        
        //console.log(this.getDistance(this.state.goals[0],this.state.goals[1]))

        return(
            <View style= {StyleSheet.container}>
                
                <MapView //lager kartet
                    style = {styles.map}
                    initialRegion = {this.state.initialRegion}
                    maxZoomLevel = {16}
                    >
                    
                    
                    <MapView.Marker
                        coordinate = {this.state.currentPosition}
                        image={require('../assets/images/blue-dot.png')}
                    />
                    
                    
                    {markers}
                    {markersVisited}

                
                     
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
