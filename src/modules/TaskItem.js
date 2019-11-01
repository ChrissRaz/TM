import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {Button , ThemeProvider} from "react-native-elements";
import * as Progress from 'react-native-progress';




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

        <TouchableOpacity onPress={this._showActions }>
            <Progress.Pie progress={0.4} size={50} />
        </TouchableOpacity>

        <TouchableOpacity onPress={this._showActions }>
            <Text> {this.props.task.description } </Text>
            <View>
              <Text>{moment(this.props.task.duree).format("hh:mm")}</Text>
              <Text>{moment(this.props.task.duree).format("hh:mm")}</Text>
            </View> 
        </TouchableOpacity>

        <TouchableOpacity  onPress={this._showActions }>
          <Text>
            Play
          </Text>
        </TouchableOpacity>


        
      </TouchableOpacity>
    );
  }
}
