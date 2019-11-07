import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import  * as h  from '../helpers/funcs';

import CalendarPicker  from 'react-native-calendar-picker';
import { Icon, Container, Left, Content } from 'native-base';
import { Header } from "react-native-elements";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import DraggableFlatList from 'react-native-draggable-flatlist';

import { connect } from 'react-redux';

import TaskItemSecondary from './../modules/TaskItemSecondary';


class GlobalTasksList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      dateTask: new Date(),
      tasks: [],
      loadingTask: true
    };

    this.findTask(h.formatDate(this.state.dateTask) ).then(
      data => this.setState({
        ...this.state,
        tasks: data,
        loadingTask: false,
        reorganized: false
      })
    );

    // this.renderItem = this.renderItem.bind(this);

  }


  findTask = async (date) =>
  {
    console.log("finding for "+date);
    
    let res = await AsyncStorage.getItem("userTasks");
    res = JSON.parse(res);

    res = res.tasks.filter(
      el => el.date == date
    );

    console.log("finded :");
    console.log(res);

    return res;
  }


  _onDateChange(date)
  {
    console.log(date);
  }


  render() {
    return (
      <Container style={{backgroundColor: this.props.configuration.theme.l5 }}>
      <Header
            style={styles.Header}

            leftComponent={
              <TouchableOpacity onPress={(e) => this.props.navigation.navigate("Home") }>
                <FontAwesomeIcon size={30} icon={faHome} style={{ color: this.props.configuration.theme.l4 }} />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'Tasks Program', style: {color: this.props.configuration.theme.l4, fontSize: 25} }}
            
            backgroundColor={this.props.configuration.theme.l1}
            barStyle="light-content"
            placement="right"
            containerStyle= {{
              height:60,
              paddingBottom: 20
            }}
          />

      <Content style={{}}>
         <View>
            < CalendarPicker
              onDateChange={(date) => this._onDateChange(date) }
              selectedDayColor={this.props.configuration.theme.l3}
              todayBackgroundColor={this.props.configuration.theme.l4}     
              allowRangeSelection={true}/>
         </View>

      

      </Content>
      <DraggableFlatList
          data={this.state.tasks}
          renderItem={(stt)=> <TaskItemSecondary stt={stt}/>}
          keyExtractor={(item, index) => ""+item.IdTask}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({...this.state, tasks: data })}
        />

      
      <TouchableOpacity style={{ 
              position: 'absolute',
              zIndex: 100,
              right: 10,
              bottom: 10

            }}>
            <FontAwesomeIcon size={60} icon={faPlusCircle} style={{ color: this.props.configuration.theme.l1 }} />
      </TouchableOpacity>

  </Container>
  
    );
  }
}



const styles = StyleSheet.create({
  heade:
  {

  }
})


const mapStateToProps = (state) => {

  return {
    configuration: state.configuration,
    dataManager: state.dataManager
  }
}

export default connect(mapStateToProps)(GlobalTasksList);