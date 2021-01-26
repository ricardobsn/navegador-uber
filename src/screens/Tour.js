import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from 'components';
import Map from '../components/Map';

class Tour extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Map />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};

export default Tour;
