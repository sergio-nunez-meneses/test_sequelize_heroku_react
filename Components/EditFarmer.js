import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class EditFarmer extends React.Component {
  constructor(props) {
    super(props);

    const { route, navigation } = this.props;
    const { id, name, address, city, coordinates } = route.params;

    this.state = {
      id: '',
      name: '',
      address: '',
      city: '',
      coordinates: '',
      id_input: id,
      name_input: name,
      address_input: address,
      city_input: city,
      coordinates_input: coordinates
    }
  };

  editFarmer = () => {
    const { route, navigation } = this.props;
    const { id, name, address, city, coordinates } = route.params;

    fetch('https://gerundio-farmers.herokuapp.com/API/editFarmer/' + id,
    {
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        // id: this.state.id_input,
        name: this.state.name_input,
        address: this.state.address_input,
        city: this.state.city_input,
        coordinates: this.state.coordinates_input,
      })
    })
      .then((response) => response.text())
      .then((responseData) => {
        Alert.alert(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => { this.props.navigation.navigate('FarmersList') });
  };

  deleteFarmer = () => {
    const { route, navigation } = this.props;
    const { id } = route.params;

    fetch('https://gerundio-farmers.herokuapp.com/API/deleteFarmer/' + id,
    {
      method: 'DELETE',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => { this.props.navigation.navigate('FarmersList') });
  };

  home = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    const { route, navigation } = this.props;
    const { id, name, address, city, coordinates } = route.params;

    return (
      <View style={styles.MainContainer}>
        <View style={styles.FormContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> edit farmer {JSON.stringify(id)}</Text>
          <TextInput
            placeholder="name"
            defaultValue = {name}
            onChangeText={text => this.setState({ name_input: text })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="address"
            defaultValue = {address}
            onChangeText={text => this.setState({ address_input: text })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="city"
            defaultValue = {city}
            onChangeText={text => this.setState({ city_input: text })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="coordinates"
            defaultValue = {coordinates}
            onChangeText={text => this.setState({ coordinates_input: text })}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacitySubmitStyle} onPress={this.editFarmer}
          >
            <Text style={styles.TextStyle}> submit </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacitySubmitStyle} onPress={this.deleteFarmer}
          >
            <Text style={styles.TextStyle}> delete </Text>
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
    flex: 3,
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
