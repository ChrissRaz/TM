import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Callendrier from '../modules/Callendrier';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>

        <Text> home </Text>
        <Text> Time Mager </Text>

        <Text> Options </Text>
        <Callendrier></Callendrier>
      </View>

    );
  }
}
