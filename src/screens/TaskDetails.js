import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';


class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.task = this.props.dataManager.tasks.find(item => item.IdTask == this.props.navigation.state.params.IdTask);
  }

  render() {
    return (
      <View style={ { backgroundColor: this.props.configuration.theme.l5 , flex: 1}}>
        <Text> Détails du task {this.task.description} </Text>
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

export default connect(mapStateToProps)(TaskDetails);
