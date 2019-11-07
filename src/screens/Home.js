import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStream, faHistory, faTasks, faGripLines, faChartLine } from '@fortawesome/free-solid-svg-icons';


import TaskItem from '../modules/TaskItem';

import { Header } from "react-native-elements";
import { Container, Content } from 'native-base';

import { connect } from 'react-redux';



var moment = require("moment");

import * as Progress from 'react-native-progress';


import  * as h  from '../helpers/funcs';



class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };

    // this._showDetails = this._showDetails.bind();
    this.activeTask;

  }


  componentDidMount()
  {
    this.props.dataManager.tasks.find(item => item.actif === true);
  }

  componentDidUpdate()
  {
    this.activeTask = this.props.dataManager.tasks.find(item => item.actif === true);
  }

  _optionsShow() {
    this.props.navigation.openDrawer();
  }

  _SwichDefaulftConfig() {
    
    h.findAll("tasks").then(
      data => { 

        h.addTasks([...data]);
    }
    );

    // this.props.dispatch({type:  "CONFIGURE_DEFAULT"});


    
  }

  _navigateNouveauRoutine() {
    console.log("nouveau routine");

    // var a =this.test();
    // console.log(a);

  }

  _showDetails(id)
  {
    this.props.navigation.navigate("Details",{IdTask: id});
  }

  _openReorder(date)
  {
    this.props.navigation.navigate("TaskLists");
  }
  _openHistory(date)
  {
    this.props.navigation.navigate("History", {taskDate: date});
  }


  render() {

    return (
      // <View style={ { backgroundColor: this.props.configuration.theme.l5 , flex: 1}}>

      <Container>
          <Header
            style={styles.Header}

            leftComponent={
              <TouchableOpacity onPress={(e) => this._optionsShow() }>
                <FontAwesomeIcon size={30} icon={faGripLines} style={{ color: this.props.configuration.theme.l4 }} />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'About Today', style: {color: this.props.configuration.theme.l4, fontSize: 25} }}
            
            backgroundColor={this.props.configuration.theme.l1}
            barStyle="light-content"
            placement="right"
            containerStyle= {{
              height:60,
              paddingBottom: 20
            }}
          />


        
          
        
          <View style={styles.topContent}>
            {/* Affichage de la tache active */}
            {
              
              this.activeTask != undefined &&
                
                <TouchableOpacity style={styles.activeTask} onPress={(e) => this._showDetails(this.activeTask.IdTask)}>
                  <Progress.Circle  color={"red"} animated= {false} thickness={6} showsText={true} progress={ h.getPercentage(this.activeTask)} size={125}  style= {styles.progressCircle}/>

                  <View style={styles.timeContainer}>
                    <Text  style= {{fontWeight:'bold', fontSize: 20, justifyContent: "center", flex:4, flexWrap: 'wrap'}} > {this.activeTask.description}   </Text>
                    
                    <Text style={{...styles.time, flex: 1.5}}>   {h.convertSecondsToHour(this.activeTask.duree)}   </Text>
                    <Text style={{...styles.time , flex: 1.5}}>   {h.convertSecondsToHour(h.getAvailableTime(this.activeTask))}   </Text>
                    
                  </View>
                  
                </TouchableOpacity> 
                
                

            }

            {
                this.props.dataManager.tasks.length > 0 &&

                    
                <View style={styles.tabOptionContainer}>
                    <TouchableOpacity style= {{

                        color: this.props.configuration.theme.l4, 
                        borderColor: this.props.configuration.theme.l4
                      }}
                      onPress = {(e)=> this._openReorder(this.activeTask.date)}>
                      
                      {/* <Text style= {{fontSize:20,fontWeight: "bold",}}>Reorder Tasks</Text> */}
                      <FontAwesomeIcon icon={faTasks} color={this.props.configuration.theme.l1} size={25}/>


                    </TouchableOpacity>

                    <TouchableOpacity style= {{
                      
                      borderColor: this.props.configuration.theme.l4,
                      color: this.props.configuration.theme.l4 } } 
                      onPress = {(e)=> this._openHistory(this.activeTask.date)}>

                      {/* <Text style= {{fontSize:20, fontWeight: "bold",}}>History</Text>   */}
                      <FontAwesomeIcon icon={faHistory} color={this.props.configuration.theme.l1} size={25}/>

                    </TouchableOpacity>
                </View>
              }
            </View>


            {
              this.props.dataManager.tasks.length > 0 ?

                  


                    <FlatList 
                    style= {{marginTop: 15}}
                    data={this.props.dataManager.tasks.filter((item, index)=> item.actif===false)}
                    renderItem={({ item }) => <TaskItem task={item} navigate={(id)=>this._showDetails(id)}/>}
                    keyExtractor={item => item.IdTask}
                  />

               
                    


                  :
                  
                  <View style={{ flex: 1, top: 75 , width: 300, left: 15}}>
                    <Text style={{ marginBottom: 20}}>
                      You did not define jouney tasks yet for Today,
                      We suggest you to use the default Tasks routine!
                      Have a good Day! 
                      </Text>

                    <View style={styles.confirmBtn}>
                      <Button   color = {this.props.configuration.theme.l2} title="It's Ok" onPress={(e) => this._SwichDefaulftConfig()} />
                      <Button color = {this.props.configuration.theme.l2} title="Create new" onPress={(e) => this._navigateNouveauRoutine()} />
                    </View>


                  </View>
              

            }

        

        </Container>

    );
  }
}


const styles = StyleSheet.create(
  {
    base:
    {
      flex: 1,
     
    },

    activeTask:
    {
      flex: 6,
      alignItems: "center",
      paddingTop: 20,
      // backgroundColor:  "green"
    },
    progressCircle:
    {
      marginBottom: 20
    },
    timeContainer:
    {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    time:
    {
      fontSize: 20,
      color: "brown"
    },
    TaskList:
    {

      paddingTop:10,
      // backgroundColor: "red"

    },
    confirmBtn:
    {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    tabOptionContainer:
    {
      top: 28,
      justifyContent: 'space-between',
      height: 70,
      flex: 0.7
    },
    tabOption:
    { 
      borderWidth: 1, 
      borderRightWidth: 0,
      
    },
    topContent:
    {
      flexDirection: 'row'
    }
  }
);

const mapStateToProps = (state) => {

  return {
    configuration: state.configuration,
    dataManager: state.dataManager
  }
}

export default connect(mapStateToProps)(Home);
