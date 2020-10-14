import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  farmersList = () => {
    this.props.navigation.navigate('FarmersList');
  }

  insertFarmer = () => {
    this.props.navigation.navigate('InsertFarmer');
  }

  render() {
    return(
      <View style={styles.MainContainer}>
        <TouchableOpacity
          activeOpacity = { .4 }
          style={styles.TouchableOpacityStyle} onPress={this.signUp}
        >
          <Text style={styles.TextStyle}> sign up </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity = { .4 }
          style={styles.TouchableOpacityStyle} onPress={this.farmersList}
        >
          <Text style={styles.TextStyle}> show farmers list </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity = { .4 }
          style={styles.TouchableOpacityStyle} onPress={this.insertFarmer}
        >
          <Text style={styles.TextStyle}> insert farmer </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  TouchableOpacityStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '50%',
    backgroundColor: '#00BCD4',
  },
  TextStyle: {
    color:'#fff',
    textAlign:'center',
    textTransform: 'uppercase'
  }
});
