import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import  * as h  from '../helpers/funcs';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faPowerOff, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';

class HistoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20}}>
        <Text style={{flex:3.5, flexWrap:'wrap', fontSize: 15}}>{this.props.hist.taskDesciption}</Text>
        <Text style={{flex:2}}>{ h.formatDateToDailyHour(new Date(this.props.hist.dateDebut*1000)) }</Text>
        <Text style={{flex:2}}>{ h.formatDateToDailyHour(new Date(this.props.hist.dateFin*1000)) }</Text>
        {
          this.props.hist.off?
          <FontAwesomeIcon color='red' style={{flex: 1, right: 8}} icon={faPowerOff}/>:
          <FontAwesomeIcon color='green' style={{flex: 1, right: 8}} icon={faCheckDouble}/>
        }
      </View>
    );
  }
}


const mapStateToProps = (state) => {

    return {
      configuration: state.configuration,
      dataManager: state.dataManager
    }
  }
  
  export default connect(mapStateToProps)(HistoryItem);
