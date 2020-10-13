// import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Button, View, Text, TextInput, Search, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView from "react-native-maps";
import * as Permissions from 'expo-permissions';
// import RNLocation from 'react-native-location';

export default function App() {
  const [data, setData] = useState([]);
  const searchedText = '';
  const farms = [];

  useEffect(() => {
    fetch('https://gerundio-farmers.herokuapp.com/fetch')
      .then((response) => response.json())
      .then((json) => { setData(json) })
      .catch((error) => console.error(error))
  }, []);

  function searchedTextInputChanged(text) {
    searchedText = text;
  }

  return (
    <React.Fragment>
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto"/> */}
      <TextInput
        style={styles.text_input}
        placeholder="Enter whatever you want"
        onChangeText={(text) => {}}
        onSubmitEditing={(text) => {}}
      />
      <Button
        style={styles.button}
        title="Search"
        onPress={() => {}}
      />
    </View>
    <View style = {styles.list_container}>
      <FlatList
        data={data}
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
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list_container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
