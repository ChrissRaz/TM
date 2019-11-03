import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity,StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import { Button, ThemeProvider } from "react-native-elements";
import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';




var moment = require("moment");

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };



  }


  _calculPoucent()
  {
    if (this.props.tasks.actif!=null)
    {

    }
    else
    {

    }
  }

  _showActions() {
    Alert.alert("Details", "Surpriiiise");
  }

  _swichToPredecessor()
  {
    console.log("swich");
  }

  render() {
    return (
      <TouchableOpacity style={styles.base} onLongPress={this._showActions}>

        <View >
          <Progress.Circle showsText={true} progress={0.4} size={70} />
        </View>

        <View>
          <Text> {this.props.task.description} </Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{moment(this.props.task.duree).format("hh:mm")}</Text>
            <Text style={styles.time}>{moment(this.props.task.duree).format("hh:mm")}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={this._swichToPredecessor} style={styles.commande}>
          {
            this.props.task.actif == false ? <FontAwesomeIcon size={20} icon={faPlay} style={{ color: "green" }} /> :
              <FontAwesomeIcon size={20} icon={faPause} style={{ color: this.props.configuration.theme.l1 }} />
          }
        </TouchableOpacity>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create(
  {
    base:
    {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10
    },

    timeContainer:
    {
      flexDirection: "row",
      justifyContent: "space-around"
    },

    time:
    {
      borderColor : "red",
      borderRadius: 10,
      width: 50,
      height: 50,
    },

    commande:
    {
      justifyContent: "center"
    }

  }
);


const mapStateToProps = (state) => {

  return {
    configuration: state.configuration,
  }
}

export default connect(mapStateToProps)(TaskItem);


