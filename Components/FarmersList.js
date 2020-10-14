import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

export default class FarmersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  };

  getFarmers = async() => {
    const response = await fetch('https://gerundio-farmers.herokuapp.com/API/displayAll');
    const farmers = await response.json();
    this.setState({ data: farmers.farmers });
  };

  componentDidMount = () => {
    this.getFarmers();
  };

  home = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.MainContainer}>
        <View style={styles.FormContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> current farmers </Text>
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.DataStyle}>{item.id}</Text>
                <Text style={styles.DataStyle}>{item.name}</Text>
                <Text style={styles.DataStyle}>{item.address}</Text>
                <Text style={styles.DataStyle}>{item.city}</Text>
                <Text style={styles.DataStyle}>{item.coordinates}</Text>
              </View>
            )}
          />
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
    flex: 2,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  TouchableOpacityContainer: {
    flex: 1,
    alignItems: 'center',
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
  },
  DataStyle: {
    borderWidth: 1,
    borderColor: '#ff0000',
    color:'#000',
    textAlign:'center',
    textTransform: 'uppercase'
  },
});
