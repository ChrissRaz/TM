import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {Button , ThemeProvider} from "react-native-elements"




var moment = require("moment");

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    
  }

  _showActions()
  {
    Alert.alert("Actions","Surpriiiise");
  }

  render() {
    return (
      <TouchableOpacity onPress={this._showActions }>
        <ThemeProvider>
          <Button title="test"></Button>
        </ThemeProvider>
        <Text> {this.props.task.description } </Text>
        <View>
          <Text>{moment(this.props.task.duree).format("hh:mm")}</Text>
          <Text>{moment(this.props.task.duree).format("hh:mm")}</Text>
        </View> 
      </TouchableOpacity>
    );
  }
}
