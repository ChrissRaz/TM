import React, { Component } from 'react';
import { View, Text ,StyleSheet } from 'react-native';
import Callendrier from '../modules/Callendrier';
import Menu from '../modules/Menu';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEquals } from '@fortawesome/free-solid-svg-icons';
import TaskItem from '../modules/TaskItem';

// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import SQLite from "react-native-sqlite-2";
import {} from "react-native-sqlite-storage";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

      this.tasks = [
        {
        IdTask: "1",
        description: "Etudes et Travail",
        duree: 5,
        date: "22-12-2019",
        actif: null,
        history: [{IdHistory:"1", dateDebut: 5000000, dateFin: 520000}, {IdHistory:"1", dateDebut: 521000, dateFin: 521000}]
      },
      {
        IdTask: "2",
        description: "Etude et autres",
        duree: 28800,
        date: "22-12-2019",
        actif: "1",
        history: [{IdHistory:"1", dateDebut: 521000, dateFin: null}]
      }
    ];


    this.db = SQLite.openDatabase("database/TMDB.db", "1.0", "", 1);

    console.log(this.db);

    this.db.transaction(function(txn) {
      txn.executeSql("SELECT * FROM `TASK`", [], (tx, res) => {
          console.log("fech terminated")
        for (let i = 0; i < res.rows.length; ++i) {
          console.log("item:", res.rows.item(i));
        }
      });
    });
      
    
  }

  

  render() {


    return (
      <View style={styles.base}>
        <Icon name='g-translate' color='#00aced' />

        <Menu style ={styles.Header}/>
         
         {
           this.tasks.length > 0 ? 
           <FlatList style= {styles.TaskList}
           data={this.tasks}
           renderItem={({ item }) => <TaskItem task={item}/>}
           keyExtractor={item => item.IdTask}
           /> 
           :
           <View>
              
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
      justifyContent: "space-around",
      alignContent: "space-around"
    },
    Header:
    {
      flex: 2,

    },

    TaskList:
    {
      flex: 8,
      alignContent: "space-between",
      
    }
  }
);
