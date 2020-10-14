import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import MapView, { Marker } from "react-native-maps";

export default class FarmersMap extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      region:
      {
        latitude: this.minMaxRandom(47, 47.1),
        longitude: this.minMaxRandom(3.1, 3.2),
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      },
      markers: [],
      data: []
    }
  }

  minMaxRandom = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  }

  // create random markers
  randomMarkers = (length) => {
    for(let i = 0; i < length; i++) {
      this.state.markers.push({id: i, title: 'Best Place', description: 'Description' + i, coordinates: { latitude: this.minMaxRandom(47, 47.1), longitude: this.minMaxRandom(3.1, 3.2)}});
    }

    this.setState({ markers: this.state.markers });
  }

  mapMarkers = () => {
    return this.state.markers.map(
      (markers) =>
      <Marker
        key={markers.id}
        coordinate={{ latitude: markers.coordinates.latitude, longitude: markers.coordinates.longitude }}
        title={markers.title}
        description={markers.description}
      >
      </Marker>
    )
  }

  // fetch markers from API
  getFarmers = async() => {
    const response = await fetch('https://gerundio-farmers.herokuapp.com/API/displayAll');
    const farmers = await response.json();
    this.setState({ data: farmers.farmers });
  };

  componentDidMount = () => {
    this.getFarmers();
    this.randomMarkers(10);
    console.log(this.state.markers);
  };

  farmerMarkers = () => {
    return this.state.data.map(
      (data) =>
      <Marker
        key={data.id}
        coordinate={{ latitude: this.minMaxRandom(47, 47.1), longitude: this.minMaxRandom(3.1, 3.2) }}
        title={data.name}
        description={data.address}
      >
      </Marker>
    )
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
          loadingEnabled = {true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress = {false}
          showsUserLocation={true}
          showsCompass={true}
          style={{ flex: 10, alignItems: 'center' }}
        >
          {this.mapMarkers()}
        </MapView>
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
    flex: 1.25, // 2.25 with TextInput
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
