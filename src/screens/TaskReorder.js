import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Container, Header, Left, Content } from 'native-base';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { getPercentage,convertSecondsToHour, getAvailableTime } from '../helpers/funcs';



export default class TaskReorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.tasks= this.props.dataManager.tasks.filter(el => el.date === this.props.taskDate);
  }

  render() {
    return (
      <Container>
            
            <DraggableFlatList
              style={{backgroundColor: "red", }}
              data={this.props.dataManager.tasks}
              renderItem={({ item, index, move, moveEnd, isActive }) => <Text style={{backgroundColor: "green", margin: 20,}}>{item.description}</Text>}
              keyExtractor={(item, index) => item.IdTask}
              scrollPercent={5}
              onMoveEnd={({ data }) => console.log("end")}
              
            />
        
       </Container>
    );
  }
}


const mapStateToProps = (state) => {

    return {
      configuration: state.configuration,
      dataManager: state.dataManager

    }
  }
  
  module.exports = connect(mapStateToProps)(TaskReorder);