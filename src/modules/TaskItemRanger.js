import React, { Component } from 'react';
import { View, Text , StyleSheet , TouchableOpacity} from 'react-native';
import  * as h  from '../helpers/funcs';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlag} from '@fortawesome/free-solid-svg-icons';

 
import { connect } from 'react-redux';

import {Slider} from 'react-native-elements';

import { from } from 'rxjs';

class TaskItemRanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _updateDuration(newDuration)
  {
    
    this.props.stt.item.duree = newDuration*60 ;

    this.props.updateDuration(this.props.stt.item);  
  }

  render() {
    return (
      
        <TouchableOpacity
        style={{ 
          justifyContent: 'center',
          marginBottom: 7,
          flex: 1,
          alignItems: "center",
          backgroundColor: this.props.selected? "rgba(240,240,240,0.4)":"rgba(175,175,175,0)"
        }}
        onLongPress={this.props.stt.move}
        onPressOut={this.props.stt.moveEnd}
        onPress = {() => {this.props.edit(this.props.stt.item); }}
      >

        <View style={{
          justifyContent: 'center',
          marginBottom: 7,
          flexDirection: "row",
          justifyContent: "space-around",
          flex: 1,
          alignItems: "center",
        }}>
          <FontAwesomeIcon color={ this.props.stt.isActive ? this.props.configuration.theme.l1  : this.props.configuration.theme.l2
          } style={{ flex: 1}} size={15} icon={faFlag} />

          <Text style={{ 
            fontWeight: 'bold', 
            color: 'white',
            fontSize: 18,
            flex: 2,
            flexWrap: "wrap",
            marginLeft: 7,
            alignItems: 'center',
            color: this.props.stt.isActive ? this.props.configuration.theme.l1  : this.props.configuration.theme.l2,
          }}>{this.props.stt.item.description} </Text>

          <View style={{ alignItems: 'stretch', justifyContent: 'center',width: 175, right: 20 }}>
            <Slider
              value={this.props.stt.item.duree/60}
              onValueChange={value => this._updateDuration(value)}  
              step={1}
              minimumValue={15}
              maximumValue={(this.props.stt.item.duree+this.props.available)/60}
              thumbTintColor = {this.props.configuration.theme.l2}
              animationType='spring'
              thumbStyle={{width: 30, height: 30, borderRadius: 15 }}
              
            />
            <Text>{h.convertSecondsToHour( this.props.stt.item.duree)}</Text>
          </View> 
        </View>
        <View  style={{borderBottomWidth: 2,
         height: 1, width: 200, borderBottomColor: this.props.configuration.theme.l4}}></View>
      </TouchableOpacity>
      
    );
  }
}



const mapStateToProps = (state) => {

    return {
      configuration: state.configuration,
    }
  }
  
  export default connect(mapStateToProps)(TaskItemRanger);