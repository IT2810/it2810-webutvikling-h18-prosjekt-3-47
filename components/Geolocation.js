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

const DISTANCE_THRESHOLD_FACTOR = 0.00001; //Konstant for begresning i distanse
const TICK_INTERVAL = 10000; //Konstant for intervallet(satt til 10 sekunder)

export default class Geolocation extends Component{
    
    constructor(props){
        super(props);
        
        //Setter default state
        this.state = {
            initialRegion: null,
            currentPosition: {
                latitude: 0,
                longitude: 0
            },
            message: 'Målet ditt er å besøke alle markører på kartet.',
            
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

            {
                title: 'test',
                latitude: 63.414726,
                longitude: 10.406740
            }, 
            {
                title: "Gråkallen",
                latitude: 63.420556,
                longitude: 10.251389
            },
            {
                title: "Realfagskantina",
                latitude: 63.415498,
                longitude: 10.404615
            },
            {
                title: "Realfagstest",
                latitude: 63.415435,
                longitude: 10.405071
            }

            ],
            //Liste med de besøkte stedene, er tom by default
            visited: [],
        }

        this.tick = this.tick.bind(this);
        this.checkGoals = this.checkGoals.bind(this);
    }

    //Funksjon som lager en oppdatert liste med hva vi har besøkt
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
        console.log('checking goal:', goalPos.title)
    if(this.getDistance(currentPos, goalPos) <= DISTANCE_THRESHOLD_FACTOR * currentPos.accuracy){
        console.log('Is nearby a goal:', goalPos.title)

        if(this.state.visited.indexOf(goalPos) < 0){
            
            console.log('Visited new point!!', goalPos.title);

            this.setState((prevState) => {
                let newGoals = this.returnFilteredArray(prevState.goals, goalPos);
                let newVisited = prevState.visited.concat(goalPos);
                let message = this.createMessage(newGoals, newVisited); 

                return {
                    goals: newGoals,
                    visited: newVisited,
                    message: message,
                    points: this.getPoints(newVisited)
                }
            });
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
    getPoints = (visited) => {
        let userPoints = visited.length*100
        return userPoints
    }

    //Lager en motiverende melding til bruker
    createMessage = (goals, visited) => {
        let message;
        if(goals.length === 0){
            message = "Bra jobba, du har besøkt alle stedene!"
        }else if(goals.length > 0 && goals.length <= 2){
            message = "Strålende innsats, du er nesten i mål! Keep up the good work!"
        }else {
            message = "Du er igang!"
        }
        //console.log(message);
        return message;
    }
    
    //Sjekker om målene våre er i nærheten
    checkGoals() {
        this.state.goals.forEach((goal) => {
            this.isNearby(this.state.currentPosition, goal);
        });
    }

    //Finner posisjons ved hjelp av en async funksjon
    getLocationAsync = async (callback) => {
    //Setter status til om vi får lov til å bruke enhetens posisjon
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
        errorMessage: 'Permission to access location was denied',
        });
    }
    
    //Finner posisjonen vår og setter den til en variabel
    let location = await Location.getCurrentPositionAsync({});
    //console.log(location);

    //Hvis vi ikke har en initialRegion, tar vi inn data som er lagret i location
    //Og setter latitudeDelta og longitudeDelta med hardkodet data
    if (this.state.initialRegion === null) {
        let latLng = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05, // position.coords.latitudeDelta,
            longitudeDelta: 0.05, // position.coords.longitudeDelta,
        }
        this.setState({
            initialRegion: latLng
        });
    }
    console.log(location);

    //setter latitude, longitude og accuracy hos currentPosition
    this.setState({ currentPosition: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy
    }}, () => {
        if(callback && typeof callback === 'function'){
            //Endrer staten til parent
            callback();
        }
    });

    //console.log(this.state);
    };

    //Funksjon som kaller getLocationAsync med checkGoals som parameter 
    tick() {
        // Sending checkGoals as callback
    this.getLocationAsync(this.checkGoals);
    }


    watchID = null;

    //Vi hindrer at vi får flere markører fra vår posisjon
    componentWillUnmount(){
        navigator.geolocation.stopWatch(this.state.watchID)
    }
    
    //Funksjon tick kjøres når vi rendrer komponenten
    //Og setter et interval som kjører hvert 10 sekund
    componentDidMount() {
        this.tick();
        
        setInterval(this.tick, TICK_INTERVAL);
        
    }

    /*For å få opp ytelse om nødvendig
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.visited !== this.state.visited || nextState.goals !== this.state.goals)
    }
    */
    
    render(){
        
        console.log('rendering!');

        //Inititaliserer en tom liste med markører
        let markers = [];
        //console.log(markers.length);
        //Inititaliserer en tom liste med besøkte markører
        let markersVisited = [];
        
        //Legger til markører i markers lista
        for (let i=0; i < this.state.goals.length; i++) {
            markers.push(<MapView.Marker
                key={i}
                coordinate = {this.state.goals[i]}
            />); 
        }

        //Legger til markører i markersVisited lista
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
                    //maxZoomLevel = {16}
                    >
                    
                    <MapView.Marker //Gjør om posisjonen vår om til en markør
                        coordinate = {this.state.currentPosition}
                        image={require('../assets/images/blue-dot.png')}
                    />
                    
                    {markers /*Viser fram alle markørene vi har*/}
                    {markersVisited /*Viser fram alle markørene vi har besøkt*/}

                </MapView>
                <Text style={styles.text} >
                    {this.state.points ? `Dine poeng er: ` + this.state.points + '\n' : null /*sjekker om vi har poeng, hvis ikke returner ingenting*/}
                    {this.state.message}
                    {`\nAntall steder som gjenstår: `}{markers.length}
                </Text>
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
    },
    text: {
        fontSize:20,
        fontWeight: "bold",
        backgroundColor: 'lightgrey'
    }
});
