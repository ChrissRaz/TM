import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import  * as h  from '../helpers/funcs';

import CalendarPicker  from 'react-native-calendar-picker';
import { Icon, Container, Left, Content } from 'native-base';
import { Header } from "react-native-elements";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import DraggableFlatList from 'react-native-draggable-flatlist';

import { connect } from 'react-redux';

import TaskItemSecondary from './../modules/TaskItemSecondary';




class AddTsk extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dateNewTasks: new Date() ,
      tasks: [],
      findAnotherDate: false,
      dateValidated: false,
    };


    

    if (this.props.date)
    {
      this.setState(
        {
          ...this.state,
          dateNewTasks: this.props.date
        }
      );
    }
    else
    {
      this.setState(
        {
          ...this.state,
          findAnotherDate: true,
        }
      );
    }

    //Variable for storing data when chosing another date
    this.findedDate;
    

  }



  _onDateChange(date)
  {
    this.findedDate= date;
  }

  changeDate(date)
  {
    if (this.findedDate!=undefined)
    {
      this.setState(
        {
          ...this.state,
          dateNewTasks: date,
          findAnotherDate: false
        }
      );
      
    }
  }



  render() {
    return (
      <Container style={{backgroundColor: this.props.configuration.theme.l5 }}>
      <Header
            style={styles.header}

            leftComponent={
              <TouchableOpacity onPress={(e) => this.props.navigation.navigate("Home") }>
                <FontAwesomeIcon size={30} icon={faHome} style={{ color: this.props.configuration.theme.l4 }} />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'Add new tasks ', style: {color: this.props.configuration.theme.l4, fontSize: 25} }}
            
            backgroundColor={this.props.configuration.theme.l1}
            barStyle="light-content"
            placement="right"
            containerStyle= {{
              height:60,
              paddingBottom: 20
            }}
          />

      <Content style={{flex: 1}}>
       
            {/* limiter la date minimale à la date actuel */}


          {
            this.state.findAnotherDate && < CalendarPicker
              style= {{flex: 2}}
              onDateChange={(date) => this._onDateChange(date) }
              selectedDayColor={this.props.configuration.theme.l3}
              todayBackgroundColor={this.props.configuration.theme.l4}     
              />
          }

        
      </Content>       

  </Container>
  
    );
  }
}



const styles = StyleSheet.create({
  header:
  {

  }
})


const mapStateToProps = (state) => {

  return {
    configuration: state.configuration,
    dataManager: state.dataManager
  }
}

export default connect(mapStateToProps)(AddTsk);