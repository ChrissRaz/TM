import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, AsyncStorage, Button, ScrollView, Alert } from 'react-native';
import  * as h  from '../helpers/funcs';

import CalendarPicker  from 'react-native-calendar-picker';
import { Icon, Container, Left, Content } from 'native-base';
import { Header,Input,CheckBox} from "react-native-elements";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle, faCheck, faCalendar, faCheckCircle, faChair, faCheckSquare, faBars, faTimes, faCalendarAlt, faFlag, faClock, faBell } from '@fortawesome/free-solid-svg-icons';

import DraggableFlatList from 'react-native-draggable-flatlist';

import { connect } from 'react-redux';

import { NavigationEvents  } from 'react-navigation';

import TaskItemRanger from './../modules/TaskItemRanger';





class AddTsk extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dateNewTasks: new Date() ,
      tasks: [],
      openInEditor: null,
      findAnotherDate: false,
      nextId: 0,
      validaTed: false,
      availableTime: 24*3600,
      modificationMode: false
    };
  

    //Variable for storing data when chosing another date
    this.findedDate = this.state.dateNewTasks;
    this.validaTed=this.state.validaTed;
    this.availableTime=this.state.availableTime;

    //aficherautomatiquement sur l'éditeur le preemier task

  }


  componentDidMount()
  {
    console.log("before mounting");

    if (this.props.date!=undefined)
    {
      this.setState(
        {
          ...this.state,
          dateNewTasks: this.props.date,
          findAnotherDate: false,
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
  }


 
  _verifyAvailableDuration()
  {
    let available = this._getAvailableDuration();

    if (available!=(24*3600))
    {
      this.state.availableTime = available,
      this.validaTed = false;
    }
    else if (available==(24*3600))
    {
      this.state.availableTime = available,
      this.validaTed = true;
    }
    else
    {
      console.warn("Erreur il ya une excès de durée");
    }

  }



  //get available seconds for a spécified list of tasks
  _getAvailableDuration(tasks=this.state.tasks)
  {
    let available = 24*3600;

    tasks.forEach(
      el=>{
        available -= el.duree;
      }
    );

    return available;
  }


  _updateTask(updatedTask)
  {
    //available time befor adding new data
    let avn = this._getAvailableDuration();

    if (avn>0)
    {
      let updated = this.state.tasks.map(
        e=>{  
          if (e.IdTask==updatedTask.IdTask)
          {
            e.duree = updatedTask.duree;
          }

          return e;
        }
      );

      let av = this._getAvailableDuration(updated);

      this.setState(
        {
          ...this.state,
          tasks: updated,
          availableTime: av,
          validaTed: av==0
        }
      );
    }
    else if(avn==0)
    {
      this.setState({
        ...this.state,
        validaTed: true
      });
    }
    else
    {
      console.log("Not available duration yet");
    }
  }


  moveEnd(data)
  { 

    data = data.map(
      (el,i) =>
      {
        //delete later if not used
        el.next = i != data.length-1 ?   data[i+1].IdTask : data[0].IdTask;
        el.order= i;
        return el;
      }
    );

    this.setState({...this.state, tasks: data });
  }


  newTask()
  {
    if(this.availableTime>=60*15)
    {
      //the Id must be changed when uploading
      let newTask = {
        IdTask: this.state.nextId,
        date: null,
        description: "Task_"+this.state.nextId,
        duree: 15*60,
        actif: false,
        history: [],
        childs:  [],
        next: null,
        order: this.state.tasks.length,
        notifyBeforeEnding: true,
        notifyBegining: true,
        notifyBeforeEndingDuration: 5
      };
  
      //test 
      let updated = this.state.tasks;
    
      updated.push(newTask);
      let av =this._getAvailableDuration(updated);
  
      this.setState({
        ...this.state,
        tasks: updated,
        openInEditor: newTask,
        nextId: this.state.nextId+1,
        availableTime: av,
        validaTed: av==0


      });
    }
    else
    {
      console.log("Il n'y a plus de temps disponible pour un nouveau tache");
    }

  
  }


  _updateTaskDetails(numInfo,data)
  {
    switch (numInfo) {
      case 0:
        data=data+"";
          if (data.replace(" ","")!="")
          {
            this.setState({
              ...this.state
            });
          }
          else
          {
            let updated = this.state.tasks.map(
              e => {
                if (e.IdTask=this.state.openInEditor.IdTask)
                {
                    e.description = data;
                }
              }
            );

            this.setState({
              ...this.state,
              tasks: updated
            });

          }
        break;
    
     
    }
  }


  //this method save tasks when data is validated
  _saveTasks()
  {
    console.log('saving');
    console.log(this.state.dateNewTasks);
    this.state.tasks =    this.state.tasks.map(
      e=>
      {
        if (e.order==0)
        {
          e.actif= true;
        }

        return e;
      }
    )

    h.addTasks(this.state.tasks,this.state.dateNewTasks).then(
      data =>
      Alert.alert("Success","Tasks for "+ h.formatDate(this.state.dateNewTasks)+ " is added succesflulu!!! ",[ {text: 'Ok', onPress: () => this._finish()},]),
    ).catch(
      err =>

      {  
        console.warn(err);  
        Alert.alert("Failure","Failed to save datas!!",[{text: 'Cancel'}, {text: 'Retry', onPress: () => this._saveTasks()}],{cancelable: true})

      }    
);


    
    
  }


  _showEditor(task)
  { 

    this.setState({
      ...this.state,
    openInEditor: task 
  })
  }


  _changeDateModeChange()
  {
    this.setState({
      ...this.state,
      findAnotherDate: !this.state.findAnotherDate
    });
  }

  _onDateChange(date)
  {
    this.setState(
      {
        ...this.state,
        dateNewTasks: new Date(date),
      }
    );
  
  }


//
_finish()
{
  this.props.navigation.navigate("TaskLists",{date: this.state.dateNewTasks});
}


  render() {
    return (
      <NavigationEvents onDidFocus={payload => console.debug('didBlur', payload)}>

     
        <Container style={{backgroundColor: this.props.configuration.theme.l5 }}>
        <Header
              style={styles.header}

              leftComponent={
                <TouchableOpacity onPress={(e) => this.props.navigation.navigate("Home") }>
                  <FontAwesomeIcon size={30} icon={faHome} style={{ color: this.props.configuration.theme.l4 }} />
                </TouchableOpacity>
              }
              centerComponent={{ text: !this.state.modificationMode? 'Add new tasks ': 'Task modification', style: {color: this.props.configuration.theme.l4, fontSize: 25} }}
              
              backgroundColor={this.props.configuration.theme.l1}
              barStyle="light-content"
              placement="right"
              containerStyle= {{
                height:60,
                paddingBottom: 20
              }}
            />

        <View style={{flex: 1}}>
        
            {/* limiter la date minimale à la date actuel */}

            {
              this.state.findAnotherDate ? 
              <View style={{flex: 1, justifyContent: 'space-between'}}>
        
                <TouchableOpacity style= {{alignSelf: 'center', top: 10, flex: 2}} onPress={(e)=> this._changeDateModeChange()}>
                  <FontAwesomeIcon color={this.props.configuration.theme.l1} size={110} icon={faCheckCircle}/>
                </TouchableOpacity>

                <View style={{  flex: 3, bottom: 25}}>

                  <CalendarPicker
                  onDateChange={(date) => this._onDateChange(date) }
                  selectedDayColor={this.props.configuration.theme.l3}
                  todayBackgroundColor={this.props.configuration.theme.l4}
                  minDate = {new Date()}     
                  initialDate = {this.state.dateNewTasks}
                  />

                </View>
                
              </View>

                :

              <View style={{flex: 1}}>

                <View style={{flexDirection: 'row', justifyContent:"space-between", alignItems:'center', }}>
                  <Text>Not allowed duration: {h.convertSecondsToHour(this._getAvailableDuration())}</Text>
                  <Text>Added: {this.state.tasks.length}</Text> 

                  {
                    this.state.validaTed &&
                    <TouchableOpacity style={{zIndex: 100, alignSelf: 'center'}} onPress={(e)=> this._saveTasks()}>
                      <FontAwesomeIcon color={this.props.configuration.theme.l1} size={30} icon={faCheck}/>
                    </TouchableOpacity>
                  }

                  <TouchableOpacity style={{zIndex: 100, alignSelf: 'flex-end'}} onPress={(e)=> this._changeDateModeChange()}>
                    <FontAwesomeIcon color={this.props.configuration.theme.l1} size={30} icon={faCalendarAlt}/>
                  </TouchableOpacity>
              </View>
                

              <View style={{flex: 3, borderBottomWidth: 3, borderBottomColor: this.props.configuration.theme.l3}}>
                {
                  this.state.tasks.length>0?
                  <DraggableFlatList
                  // contentContainerStyle= {{}}
                  data={this.state.tasks}
                  renderItem={(stt)=> <TaskItemRanger selected={this.state.openInEditor.IdTask==stt.item.IdTask} available={this.state.availableTime} updateDuration= {(id,value)=> this._updateTask(id,value)} edit={(task)=> this._showEditor(task)} stt={stt}/>}
                  keyExtractor={(item, index) => ""+item.IdTask}
                  scrollPercent={5}
                  onMoveEnd={({ data }) => this.moveEnd(data)}
                  />
                  
                  :

                  <View style={{alignSelf: 'center', flexDirection: 'row', top: 65}}>
                    <Text  style={{fontSize: 14}}>
                      No task Added yet!! Click 
                    </Text>
                    <TouchableOpacity onPress={(e)=> this.newTask()}>
                      <Text style={{color: this.props.configuration.theme.l2, fontSize: 14}}> here to add one!</Text>
                    </TouchableOpacity>
                    </View>
                  
                
                }
                  

              </View>
                

              <View style={{ flex: 3.5, justifyContent:"space-between"}}>
                <Text style={{alignSelf: 'center',  fontSize: 17}}>
                  Details
                </Text>
                {
                  this.state.openInEditor!=null &&
                  <ScrollView style={{top: 15}}>

                    <View style={{marginBottom: 20}}>
                      <Input maxLength={25} onEndEditing={(text)=> this._updateTaskDetails(0,text)} leftIconContainerStyle={{right: 5}} leftIcon={<FontAwesomeIcon color={this.props.configuration.theme.l3} icon={faFlag}/>} labelStyle={{color: this.props.configuration.theme.l3}} placeholder="description" label="Description" defaultValue={this.state.openInEditor.description}/>
                    </View>

                    <View style={{marginBottom: 20}}>
                      <Input leftIconContainerStyle={{right: 5}} leftIcon={<FontAwesomeIcon color={this.props.configuration.theme.l3} icon={faClock}/>} labelStyle={{color: this.props.configuration.theme.l3}} disabled={true} placeholder="15:00" label="Dutation" value={h.convertSecondsToHour(this.state.openInEditor.duree) }/>
                    </View>

                    <View style={{marginBottom: 20}}>
                      <CheckBox
                        checked={this.state.openInEditor.notifyBeforeEnding}
                        onPress={() => this._updateTaskDetails(3,!this.state.openInEditor.notifyBeforeEnding)}
                        iconRight={true}
                        title="Notify Begining"
                        checkedIcon={<FontAwesomeIcon color='green' icon={faCheck}/>}
                        uncheckedIcon={<FontAwesomeIcon color='red' icon={faTimes}/>}
                        containerStyle={{backgroundColor: this.props.configuration.theme.l4}}
                        
                      />
                    </View>

                    <View style={{flexDirection: 'row', justifyContent:'flex-start', marginBottom: 20}}>
                      <CheckBox
                          checked={this.state.openInEditor.notifyBeforeEnding}
                          onPress={() => this._updateTaskDetails(4,!this.state.openInEditor.notifyBeforeEnding)}
                        
                          iconRight={true}
                          title="Notify Before ending"
                          checkedIcon={<FontAwesomeIcon style={{right: 15}} color='green' icon={faCheck}/>}
                          uncheckedIcon={<FontAwesomeIcon style={{right: 15}} color='red' icon={faTimes}/>}
                          containerStyle={{backgroundColor: this.props.configuration.theme.l4, width: 140}}
                        />

                      { 
                        this.state.openInEditor.notifyBeforeEnding && 
                        <Input onEndEditing={(text)=> this._updateTaskDetails(5,text)}  maxLength={2} inputStyle={{right: 15}} leftIcon={<FontAwesomeIcon style={{right: 20}} color={this.props.configuration.theme.l3}  icon={faBell} /> }inputContainerStyle={{width: 80}} placeholder="duration" keyboardType='number-pad' />
                      }

                    </View>

                  </ScrollView>
                
                  
                }
              </View>
              
              </View>
              
            } 

          
        </View> 


        {
          !this.state.findAnotherDate  &&
          <TouchableOpacity disabled={this.state.availableTime<15*60} onPress={(e)=> this.newTask()} style={{zIndex: 1000,alignItems: 'center', justifyContent:'center',backgroundColor: this.props.configuration.theme.l1, width: 60, height: 60, borderRadius: 30, position: 'absolute', right: 15, bottom: 15}}>
            <Text style={{color: this.props.configuration.theme.l4, elevation: 8, fontSize: 25}}>+</Text>
          </TouchableOpacity> 
        }

    </Container>
    
      </NavigationEvents>
    
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
  }
}

export default connect(mapStateToProps)(AddTsk);