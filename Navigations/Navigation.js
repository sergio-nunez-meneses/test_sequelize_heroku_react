import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Components/Home';
import FarmersList from '../Components/FarmersList';
import InsertFarmer from '../Components/InsertFarmer';
import SignUp from '../Components/SignUp';

export default class Navigation extends React.Component {
  Stack = createStackNavigator();

  render() {
    return (
      <NavigationContainer>
        <this.Stack.Navigator>
          <this.Stack.Screen name="Home" component={Home}/>
          <this.Stack.Screen name="FarmersList" component={FarmersList}/>
          <this.Stack.Screen name="InsertFarmer" component={InsertFarmer}/>
          <this.Stack.Screen name="SignUp" component={SignUp}/>
        </this.Stack.Navigator>
      </NavigationContainer>
    );
  }
}
