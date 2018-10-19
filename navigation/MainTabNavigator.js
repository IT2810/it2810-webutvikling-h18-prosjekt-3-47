import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GeolocationScreen from '../screens/GeolocationScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TodolistScreen from '../screens/TodolistScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const GeolocationStack = createStackNavigator({
  Geolocation: GeolocationScreen,
});

GeolocationStack.navigationOptions = {
  tabBarLabel: 'Geolocation',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-map${focused ? '' : '-outline'}`
          : 'md-map'
      }
      />
  ),
};

const ContactsStack = createStackNavigator({
    Contacts: ContactsScreen,
});

ContactsStack.navigationOptions = {
    tabBarLabel: 'Contacts',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-contact'}
        />
    ),
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar'}
      />
    ),
};

const TodolistStack = createStackNavigator({
  Todolist: TodolistScreen,
});

TodolistStack.navigationOptions = {
  tabBarLabel: 'Todolist',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-checkbox${focused ? '' : '-outline'}` : 'md-checkbox'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  GeolocationStack,
  CalendarStack,
  ContactsStack,
  TodolistStack
});
