import React, { Component } from 'react';
import { View, Text , StyleSheet , TouchableOpacity} from 'react-native';
import  * as h  from '../helpers/funcs';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight , faFlag} from '@fortawesome/free-solid-svg-icons';

import DraggableFlatList from 'react-native-draggable-flatlist';

import { connect } from 'react-redux';

class TaskItemSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity
        style={{ 
          justifyContent: 'center',
          marginBottom: 7,
          flexDirection: "row",
          justifyContent: "space-around",
          flex: 1,
          alignItems: "center"

        }}
        onLongPress={this.props.stt.move}
        onPressOut={this.props.stt.moveEnd}
      >
        <FontAwesomeIcon color={ this.props.stt.isActive ? this.props.configuration.theme.l1  : this.props.configuration.theme.l2
        } style={{ flex: 2}} size={21} icon={faFlag} />

        <Text style={{ 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 21,
          flex: 7,
          flexWrap: "wrap",
          marginLeft: 7,
          color: this.props.stt.isActive ? this.props.configuration.theme.l1  : this.props.configuration.theme.l2,
        }}>{this.props.stt.item.description} </Text>

        <Text style= {{fontSize: 17, flex: 2, borderWidth: 2, borderBottomColor: this.props.stt.isActive ? this.props.configuration.theme.l1  : this.props.configuration.theme.l2,
        borderRadius: 17 , textAlign:'center', marginRight: 5}}>
            {h.convertSecondsToHour( this.props.stt.item.duree) }
        </Text>


      </TouchableOpacity>
    );
  }
}



const mapStateToProps = (state) => {

    return {
      configuration: state.configuration,
    }
  }
  
  export default connect(mapStateToProps)(TaskItemSecondary);