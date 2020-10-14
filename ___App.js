import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_name: '',
      TextInput_password: '',
      TextInput_confirmPassword: '',
      TextInput_role: '',
      data: []
    }
  }

  componentDidMount() {
    this.getFarmers();
  }

  getFarmers = () => {
    fetch('https://gerundio-farmers.herokuapp.com/API/displayAll')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ data: json.farmers });
      })
      .catch((error) => console.error(error))
  }

  registerUser = () => {
    fetch('https://gerundio-farmers.herokuapp.com/API/signup',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : this.state.TextInput_name,
        password : this.state.TextInput_password,
        confirmPassword : this.state.TextInput_confirmPassword,
        role : this.state.TextInput_role
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

  showFarmers = () => {
    this.props.navigation.navigate('Second');
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Sign up </Text>
        <TextInput
          placeholder="name"
          onChangeText={ TextInputValue => this.setState({
            TextInput_name: TextInputValue
          }) }
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="password"
          onChangeText={ TextInputValue => this.setState({
            TextInput_password: TextInputValue
          }) }
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="confirm password"
          onChangeText={ TextInputValue => this.setState({
            TextInput_confirmPassword: TextInputValue
          }) }
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="role"
          onChangeText={ TextInputValue => this.setState({
            TextInput_role: TextInputValue
          })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />
        <TouchableOpacity
          activeOpacity = { .4 }
          style={styles.TouchableOpacityStyle} onPress={this.registerUser}
        >
          <Text style={styles.TextStyle}> SIGN UP </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity = { .4 }
          style={styles.TouchableOpacityStyle}
          onPress={this.showFarmers}
        >
          <Text style={styles.TextStyle}> SHOW ALL INSERTED FARMERS RECORDS IN LISTVIEW </Text>
        </TouchableOpacity>

        <View style = {styles.list_container}>
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
                <Text>{item.address}</Text>
                <Text>{item.city}</Text>
                <Text>{item.coordinates}</Text>
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  MainContainer_For_Show_StudentList_Activity: {
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
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
  TouchableOpacityStyle: {
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'
  },
  TextStyle: {
    color:'#fff',
    textAlign:'center',
  },
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  list_container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
