import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity,StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import { Button, ThemeProvider } from "react-native-elements";
import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';

import  * as h  from '../helpers/funcs';






var moment = require("moment");

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.percentage = h.getPercentage(this.props.task);
    // console.log(this.props)

  }


  componentDidUpdate()
  {
    this.percentage = h.getPercentage(this.props.task);
  }

  _openDetails()
  {
    this.props.navigate(this.props.task.IdTask);
  }

  _launchTask(id)
  {
    

  }

  _deleteTask(id)
  {
    console.log("delete")
  }


  _showActions() {
    
      Alert.alert("Actions", "What do you want to do?", [
        {text: 'Details', onPress: () => (this._openDetails())},
        {text: 'Launch', onPress: () => this._swichToPredecessor()},
        {text: 'Delete', onPress: () =>  this._deleteTask(this.props.task.IdTask)},
      ],
      {cancelable: true},
      );
    
    
    // this.props.navigation(this.props.task.IdTask);


  }

  _swichToPredecessor()
  {
    if (this.percentage==1)
    {
      Alert.alert("Actions", "You have done this task for today, do you wanna extend it and reduce another task?", [
        {text: 'Yes', onPress: () => console.log("navigate to extention page")},
        {text: 'No', onPress: () => console.log("no")},
        
      ],
      {cancelable: true},
      );
    }
    else
    {
      Alert.alert("Confirmation", "Launch '"+this.props.task.description+"' Task and stop the current one?", [
        {text: 'Yes', onPress: () => h.switchTask(this.props.task.IdTask)},
        {text: 'Cancel', onPress: () => console.log("canceled")},
      ],
      {cancelable: true},
      );
    }
    
  }

  render() {
    return (
      <TouchableOpacity style={styles.base} onLongPress={() => this._showActions()}>

        <View style={{flex: 3}}>
          <Progress.Circle  animated= {false} showsText={true} progress={this.percentage} size={70} />
        </View>

        <View style={{backGroundColor: 'red', flex: 8, }}>
          <Text style={{fontSize: 15, flexWrap: 'wrap'}} numberOfLines={2}> {this.props.task.description} </Text>
          <View style={{...styles.timeContainer,marginTop: 15, justifyContent:"space-around", flexDirection:'row'}}>
            <Text style={styles.time}>{h.convertSecondsToHour(this.props.task.duree)}</Text>
            <Text style={styles.time}>{h.convertSecondsToHour(h.getAvailableTime(this.props.task))}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => this._swichToPredecessor()} style={{...styles.commande,flex: 1, justifyContent: 'center'}}>
            {
              this.percentage ==1? <FontAwesomeIcon size={20} icon={faPlay} style={{ color: "yellow" }} /> : <FontAwesomeIcon size={20} icon={faPlay} style={{ color: "green" }} />
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
      justifyContent: "space-between"
    },

    time:
    {
     
 
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


