import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform
} from "react-native";

//Sjekker hvilken plattform vi er på
const isAndroid = Platform.OS === "android";
const viewPadding = 10;

export default class Todolist extends Component {
  //Lager default state
  state = {
    tasks: [],
    text: ""
  };
  
  //Funksjon som endrer tilstanden til text
  changeTextHandler = text => {
    this.setState({ text: text });
  };
  //Funksjon som legger til en ny oppgave og lagrer dette ved hjelp av funksjonen save
  addTask = () => {
    //Sjekker om det er noe tekst og setter den boolske verdien i notEmpty
    let notEmpty = this.state.text.trim().length > 0;

    //Hvis notEmpty er true kan vi lage en ny task
    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: Date.now().toString() + '_' + tasks.length.toString(), text: text }),

            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    } 
  };
  //Denne funksjonen sletter en oppgave og lagrer resultatet av tilstanden
  deleteTask = i => {
    if(Number.isInteger(Number(i))){
      this.setState(
        prevState => {
          let tasks = prevState.tasks.slice();

          tasks.splice(i, 1);

          return { tasks: tasks };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  componentDidMount() {
    //Viser keyboard ut ifra plattform
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );
    //Gjemmer keyboard ut ifra plattform
    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    return (
      <View
      //Henter style fra stylesheet lenger ned
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button style={styles.button} title="X" onPress={() => this.deleteTask(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

let Tasks = {
  // Denne funksjone lager en liste med objekter
  convertToArrayOfObject(tasks, callback) {
    //console.log('convertToArrayOfObject');
    //console.log(tasks);
    //console.log(tasks ? tasks.split("||").map((task, i) => ({ key: i.toString(), text: task })) : [])
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: Date.now().toString() + '_' + i.toString() , text: task })) : []
    );
  },
  //Lager en streng med teksten til objektene
  convertToStringWithSeparators(tasks) {
    //console.log('convertToStringWithSeparators');
    return tasks.map(task => task.text).join("||");
  },
  //Henter oppgaver ved hjelp av AsyncStorage
  all(callback) {
    //console.log('all');
    //console.log('callback:', callback);
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  //Lagrer oppgaver ved hjelp av AsyncStorage
  save(tasks) {
    //console.log('save');
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};



//For å style elementene til todolist
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    width: "90%"
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

AppRegistry.registerComponent("TodoList", () => TodoList);

module.exports = Todolist;
