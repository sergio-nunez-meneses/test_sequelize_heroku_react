import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import MapView from "react-native-maps";

export default class FarmersMap extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      region :
      {
        latitude: 1.290270,
        longitude: 103.851959,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    }
  }

  home = () => {
    this.props.navigation.navigate('Home');
  }

  render()
  {
    return (
      <View style={styles.MainContainer}>
        <MapView
          initialRegion = {this.state.region}
          showsUserLocation = {true}
          showsCompass = {true}
          rotateEnabled = {true}
          style={{ flex: 10, alignItems: 'center' }}
        />
        <View style={styles.TouchableOpacityStyleContainer}>
          {/* <TextInput
            placeholder="search a farmer"
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          /> */}
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacityStyle} onPress={this.home}
          >
            <Text style={styles.TextStyle}> home </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    padding: 2,
    textAlign: 'center',
  },
  TouchableOpacityStyleContainer: {
    flex: 2.25,
    alignItems: 'center',
    paddingTop: 5
  },
  TouchableOpacityStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#00BCD4'
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
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});
