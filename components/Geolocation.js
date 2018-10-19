/**
 * Forfatter: Jørgen og Sigurd
 * Denne komponenten skal lage et kart med react-native-maps
 * Kartet skal så inneholde forskjellige markører som man kan besøke
 * Ettersom man besøker disse markørene vil de bli sjekket.
 * Samt at bruker får poeng og en melding for sin progresjon.
 */

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
import c from '../constants/Colors'

import MapView from 'react-native-maps'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

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

        //Passer på hva som er state, og det er dette scopet som skal brukes
        this.tick = this.tick.bind(this);
        this.checkGoals = this.checkGoals.bind(this);
    }

    //Funksjon som tar inn en liste arr og et objekt removeElement, 
    //der de elementene som er ulik removeElement blir satt 
    //inn i en ny liste returnArr som returneres
    returnFilteredArray(arr, removeElement) {
        let returnArr = [];

        arr.forEach((elem) => {
            if (elem !== removeElement){
                returnArr.push(elem);
            }
        });

        return returnArr;
    }

    //Funksjon som sjekker om vi er i radiusen av målet vårt
    //hvis det er tilfellet, setter vi goals, visited, message og points med nye verdier
    //currentPos og goalPos har type objekt og inneholder lengde - og breddegrad, 
    //de brukes for å regne ut distanse, goalPos brukes videre i funksjonen
    isNearby = (currentPos, goalPos) => {
        //console.log('checking goal:', goalPos.title);
        //Bruker getDistance for å få ut den euklidske distansen som vi kan sammenligne med 
        if(this.getDistance(currentPos, goalPos) <= DISTANCE_THRESHOLD_FACTOR * currentPos.accuracy){
            //console.log('Is nearby a goal:', goalPos.title);
            //Vi er da innenfor distansen
            if(this.state.visited.indexOf(goalPos) < 0){
                //Dette er da et ubesøkt punkt
                //console.log('Visited new point!!', goalPos.title);
                
                this.setState((prevState) => {
                    //Vi oppdaterer newGoals med en ny verdi
                    let newGoals = this.returnFilteredArray(prevState.goals, goalPos);
                    //Vi oppdaterer newVisited med en ny denne goalPos verdien
                    let newVisited = prevState.visited.concat(goalPos);
                    //Vi lager så en ny melding
                    let newMessage = this.createMessage(newGoals, newVisited); 
                    
                    return {
                        goals: newGoals,
                        visited: newVisited,
                        message: newMessage,
                        points: this.getPoints(newVisited)
                    }
                });
            }
        }
    }

    //Funksjon som returnerer distansen mellom to steder ved hjelp av euklidsk distanse
    //Utregning blir i grader og settes i distance som har typen number
    //pos1 og pos2 har typen number, og inneholder lengde -og breddegrad som brukes i formelen
    getDistance = (pos1,pos2) => {
        let diff = (pos1.latitude-pos2.latitude)**2 + (pos1.longitude-pos2.longitude)**2;
        let distance = Math.sqrt(diff);
        return distance;
    }

    //Funksjon som returnerer poengene til bruker
    getPoints = (visited) => {
        let userPoints = visited.length*100;
        return userPoints;
    }

    //Funksjon som returnerer en melding til bruker
    createMessage = (goals, visited) => {
        let message;
        if(goals.length === 0){
            message = "Bra jobba, du har besøkt alle stedene!";
        }else if(goals.length > 0 && goals.length <= 2){
            message = "Strålende innsats, du er nesten i mål! Keep up the good work!";
        }else {
            message = "Du er igang!";
        }
        //console.log(message);
        return message;
    }
    
    //Funksjon som sjekker om vi er i nærheten av et mål
    checkGoals() {
        this.state.goals.forEach((goal) => {
            this.isNearby(this.state.currentPosition, goal);
        });
    }

    //Asynchronous som etterspør posisjonstillatelse, deretter skaffer posisjon og oppdaterer state. 
    //Kaller callback når setState er ferdig. 
    //Benytter seg av Expo sine Permissions og Location
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
        //Og setter latitudeDelta og longitudeDelta med konstanter
        if (this.state.initialRegion === null) {
            let latLng = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            this.setState({
                initialRegion: latLng
            });
        }
        //console.log(location);

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

    //Funksjon som etterspør posisjon med getLocationAsync, 
    //og this.checkGoals som callback som blir kalt når getLocationAsync er ferdig.
    tick() {
        // Sending checkGoals as callback
    this.getLocationAsync(this.checkGoals);
    }
    
    //Funksjonen tick kjøres med en gang komponenten mountes, deretter med et interval satt i TICK_INTERVAL. 
    //Dette gjøres for å kontinuerlig oppdatere posisjonen. 
    //Vi ville likt å bruke WatchPosition, men vi fikk den virkelig ikke til å fungere. 
    //Dog, dette er noe vi ville likt å få til i en eventuell senere versjon.
    componentDidMount() {
        this.tick();
        
        setInterval(this.tick, TICK_INTERVAL);
    }

    /*For å få opp ytelse om nødvendig
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.visited !== this.state.visited || nextState.goals !== this.state.goals)
    }
    */

    //Funksjon som tar inn en liste arr og en boolsk verdi isChecked
    //Hvis isChecked er true vil vi returnere en liste med checked markører
    //Hvis ikke returner vi en liste med markører uten noe custom image
    populateMarkers = (arr, isChecked) => {
        let visitedMarkers = [];
        for(let i = 0; i < arr.length; i++){
            visitedMarkers.push(<MapView.Marker
                key={i}
                coordinate = {arr[i]}
                image={isChecked ? require('../assets/images/checked.png') : null}
            />);
        }
        return visitedMarkers;
    }
    
    render(){
        
        // Fyller arrays med kartmarkører (MapView.Marker)
        let goalMarkers = this.populateMarkers(this.state.goals, false);
        let visitedMarkers = this.populateMarkers(this.state.visited, true);

        return(
            <View style= {StyleSheet.container}>
                
                <MapView //lager kartet
                    style = {styles.map}
                    initialRegion = {this.state.initialRegion}
                    >
                    
                    <MapView.Marker //Gjør om posisjonen vår om til en markør
                        coordinate = {this.state.currentPosition}
                        image={require('../assets/images/blue-dot.png')}
                    />
                    
                    {goalMarkers /*Viser fram alle markørene vi ikke har besøkt*/}
                    {visitedMarkers /*Viser fram alle markørene vi har besøkt*/}

                </MapView>
                <Text style={styles.text} >
                    {this.state.points ? `Dine poeng er: ` + this.state.points + '\n' : null /*sjekker om vi har poeng, hvis ikke returner ingenting*/}
                    {this.state.message}
                    {`\nAntall steder som gjenstår: `}{goalMarkers.length}
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
        backgroundColor: c.appMainBackground,
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
        backgroundColor: c.appMainBackground,
    }
});
