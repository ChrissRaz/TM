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
import AnimatedLoader from "react-native-animated-loader";



class GlobalTasksList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      dateTask: new Date(),
      tasks: [],

      loadingTask: true,
      reorganized: false
    };

    this.findTask(h.formatDate(this.state.dateTask) ).then(
      data => this.setState({
        ...this.state,
        tasks: data,
        loadingTask: false,
      })
    );

    this.findedAllTasks=[];

    // this.renderItem = this.renderItem.bind(this);

  }

  componentDidUpdate()
  {
    this.findTask(h.formatDate(this.state.dateTask) ).then(
      data => this.setState({
        ...this.state,
        tasks: data,
        loadingTask: false,
      })
    );
  }


  findTask = async (date) =>
  {
    
    let res = await AsyncStorage.getItem("userTasks");
    res = JSON.parse(res);

    this.findedAllTasks= res.tasks;

    res = res.tasks.filter(
      el => el.date == date
    );   

    res.sort((a, b) => a.order-b-order
      
  );

  console.log("res " ,res);

    return res;
  }

  updateTask = async (data) =>
  {
    let toUpload = this.findedAllTasks.filter(
      el => el.date!= h.formatDate(this.state.dateTask) 
    );

    toUpload = [...toUpload,...data];
    console.log("to update");
    console.log(toUpload);

    
    let res = await AsyncStorage.setItem("userTasks",JSON.stringify({tasks: toUpload}));
    
    return res;
  }

  moveEnd(data)
  { 
    console.warn("reorganisation start");

    console.log(data);
    data = data.map(
      (el,i) =>
      {
        el.next = i != data.length-1 ?   data[i+1].IdTask : data[0].IdTask;
        return el;
      }
    );
    console.warn("reorganisation end");
    console.log(data);
    this.updateTask(data).then(
      data => console.log('Tasks Upated')
    )


    this.setState({...this.state, tasks: data });
  }


  _onDateChange(date)
  {
    // console.log(typeof(date))

    let newDate = new Date(date);

    this.findTask(h.formatDate(newDate) ).then(
      data => this.setState({
        ...this.state,
        tasks: data,
        dateTask: newDate,
        loadingTask: false,
        allTasks: this.findedAllTasks
      })
    );

    this.setState(
      {
        ...this.state,
        loadingTask: true,

      }
    );
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

      <Content style={{flex: 1}}>
       
        < CalendarPicker
          style= {{flex: 2}}
          onDateChange={(date) => this._onDateChange(date) }
          selectedDayColor={this.props.configuration.theme.l3}
          todayBackgroundColor={this.props.configuration.theme.l4}     
          />
        
         <View style={{flex: 7}} >
         
        <AnimatedLoader
        visible={this.state.loadingTask}
        overlayColor="rgba(255,255,255,0)"
        speed={0.8}
        loop= {true}
        animationStyle={{width: 40, height: 40, position: 'relative', top: 55,}}
          />
          
      
         </View>

         

      </Content>


      {
        (!this.state.loadingTask && this.state.tasks.length>0)  && 
      <DraggableFlatList
          style= {{flex: 6}}
          data={this.state.tasks}
          renderItem={(stt)=> <TaskItemSecondary stt={stt}/>}
          keyExtractor={(item, index) => ""+item.IdTask}
          scrollPercent={3}
          onMoveEnd={({ data }) => this.moveEnd(data)}
        />
        
        }

      
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