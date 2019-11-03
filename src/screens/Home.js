import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStream } from '@fortawesome/free-solid-svg-icons';

import TaskItem from '../modules/TaskItem';

import { Header } from "react-native-elements";

import { connect } from 'react-redux';


import { } from "react-native-sqlite-storage";


var moment = require("moment");

import * as Progress from 'react-native-progress';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };


    this.activeTask = this.props.dataManager.tasks.find(item => item.actif === true);

  }

  _optionsShow() {
    console.log("show options");
  }

  _SwichDefaulftConfig() {
    console.log("default config");
  }

  _navigateNouveauRoutine() {
    console.log("nouveau routine");
  }

  _showActiveDetails()
  {
    if (this.activeTask!=null)
    {
      console.log("détails de la tâche active");
    }
    else
    {
      console.warn("Aucune tache active");
    }
  }


  render() {

    return (
      <View style={ { backgroundColor: this.props.configuration.theme.l5 , flex: 1}}>
          <Header
            style={styles.Header}

            leftComponent={
              <TouchableOpacity onPress={(e) => this._optionsShow()}>
                <FontAwesomeIcon size={30} icon={faStream} style={{ color: this.props.configuration.theme.l4 }} />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'About Today', style: { color: this.props.configuration.theme.l4, fontSize: 25 } }}
            
            backgroundColor={this.props.configuration.theme.l1}
            barStyle="light-content"
            placement="right"
          />


          {/* Affichage de la tache active */}
          {
            
            this.activeTask != null ?
              <TouchableOpacity style={styles.activeTask} onPress={this._showActiveDetails}>
                <Progress.Circle color={["red"]} borderRadius={10} showsText={true} progress={0.8} size={125}  style= {styles.progressCircle}/>

                <View style={styles.timeContainer }>
                  <Text style= {{fontWeight:'bold', fontSize: 20}}> {this.activeTask.description}   </Text>
                  <Text style={styles.time}>   {moment(this.activeTask.duree).format("HH:mm")}   </Text>
                  <Text style={styles.time}>   {moment(this.activeTask.duree).format("HH:mm")}   </Text>
                  
                </View>
              </TouchableOpacity> 
              
              : 

              <View>
              </View>

          }


          {
            this.props.dataManager.tasks.length > 0 ?

                <View style={styles.TaskList}>
                  <FlatList 
                  data={this.props.dataManager.tasks.filter((item, index)=> item.actif===false)}
                  renderItem={({ item }) => <TaskItem task={item} />}
                  keyExtractor={item => item.IdTask}
                />
                </View>
                


              :
              
              <View >
                <Text>
                  Vous avec définit aucune tâche journalière
                  On vous propose d'usiliser d'usiliser celui qu'on a définit par défaut pour vous!!
                  </Text>

                <View style={styles.confirmBtn}>
                  <Button title="ça me va" onPress={(e) => this._SwichDefaulftConfig} />
                  <Button title="Crérer un nouveau" onPress={(e) => this._navigateNouveauRoutine} />
                </View>


              </View>

          }

      </View>

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
      alignItems: "center",
      paddingTop: 20,
      backgroundColor:  "green"
    },
    progressCircle:
    {
      marginBottom: 20
    },
    timeContainer:
    {
      
      flexDirection: "row",
      justifyContent: "space-around",
    },
    time:
    {
      fontSize: 20,
      color: "brown"
    },
    TaskList:
    {

      paddingTop:10,
      backgroundColor: "red"

    },
    confirmBtn:
    {
      flexDirection: "row",
      justifyContent: "space-around",
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
