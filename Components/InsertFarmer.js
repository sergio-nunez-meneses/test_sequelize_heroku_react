import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class InsertFarmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_name: '',
      TextInput_address: '',
      TextInput_city: '',
      TextInput_coordinates: ''
    }
  }

  registerUser = () => {
    fetch('https://gerundio-farmers.herokuapp.com/API/insertFarmer',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.TextInput_name,
        address: this.state.TextInput_address,
        city: this.state.TextInput_city,
        coordinates: this.state.TextInput_coordinates
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  home = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.FormContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> insert farmer </Text>
          <TextInput
            placeholder="name"
            onChangeText={ TextInputValue => this.setState({
              TextInput_name: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="address"
            onChangeText={ TextInputValue => this.setState({
              TextInput_address: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="city"
            onChangeText={ TextInputValue => this.setState({
              TextInput_city: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="coordinates"
            onChangeText={ TextInputValue => this.setState({
              TextInput_coordinates: TextInputValue
            })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacitySubmitStyle} onPress={this.registerUser}
          >
            <Text style={styles.TextStyle}> submit </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TouchableOpacityContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> go back </Text>
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacityStyle} onPress={this.home}
          >
            <Text style={styles.TextStyle}> home </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  FormContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  TextInputStyleClass: {
    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5 ,
  },
  TouchableOpacitySubmitStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#FF0000'
  },
  TouchableOpacityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  TouchableOpacityStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#00BCD4'
  },
  TextStyle: {
    color:'#fff',
    textAlign:'center',
    textTransform: 'uppercase'
  }
});
