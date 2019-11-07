import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStream, faHistory, faTasks, faGripLines, faChartLine } from '@fortawesome/free-solid-svg-icons';

import TaskItem from '../modules/TaskItem';

import { Header } from "react-native-elements";
import { Container, Content } from 'native-base';

import { connect } from 'react-redux';


var moment = require("moment");

import * as Progress from 'react-native-progress';


import  * as h  from '../helpers/funcs';

export default class TaskHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> TaskHistory </Text>
      </View>
    );
  }
}
