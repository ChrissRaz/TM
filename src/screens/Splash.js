import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, AsyncStorage , Alert} from 'react-native';

import AnimatedLoader from "react-native-animated-loader";
import {connect} from 'react-redux';

import BackgroundTimer from 'react-native-background-timer';

import  * as h  from '../helpers/funcs';
import  * as d  from '../helpers/defaultConfigs';





const logo = require("../assets/TMLogo.png");


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.settingsConfirm = false;
    this.tasksConfirm = false;
    this.UTasksConfirm = false;

    
     this.checkInterval=0;

  }


  _errorOccured(err)
  {
    console.warn("Error occured when loading data: "+err);

    Alert.alert("Error", "Une Erreur c'est produit Pendant le chargement des donnés", [
      {text: 'Ok', onPress: () => console.log("close the app")},
    ],
    {cancelable: false},
    );

    
  }

  componentWillUnmount()
  {
    clearInterval(this.checkInterval);
  }
  componentDidUpdate()
  {

  }

  componentDidMount() {

    //Upadte the courrent active task

    let endTime = new Date();
    endTime.setHours(23,59,59);
    
    //service to survey Tasks progress
    BackgroundTimer.runBackgroundTimer(
      ()=> {
        let act = new Date();
      if (act == endTime)
      {
        console.log("changer");
      }

      this.props.dispatch({type:  "UPDATE_ACTIF"})},  
      1000
    );

    this.checkInterval = setInterval((e)=>
    {
      //Checking configs and datas
      if (this.settingsConfirm && this.tasksConfirm && this.UTasksConfirm)
      {
        //checking TodayTask
        h.findTodayTask().then(
          data => {
            this.props.dispatch({type: "CONFIGURE_TODAY_TASK", value: data.tasks});
            this.props.navigation.navigate("Base");
          }
        );
        
      }
      },1000);

      
    


    //setting up persist datas
    AsyncStorage.multiGet(["settings","tasks", "userTasks"]).then((val =>{ 

      val.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];

        if (key=="settings" && value==null)
        {
            AsyncStorage.setItem("settings",JSON.stringify(d.Defaultconfigs)).then(
              val=> this.settingsConfirm= true
            ).catch(err => this._errorOccured(err));
        }
        else if (key=="tasks" && value==null)
        {
          AsyncStorage.setItem("tasks",JSON.stringify(d.defaultTasks)).then(
            val => this.tasksConfirm = true
          ).catch(err => this._errorOccured(err));
        }
        else if (key=="userTasks" && value==null)
        {
          AsyncStorage.setItem("userTasks",JSON.stringify(d.defaultUserTasks)).then(
            val => this.UTasksConfirm = true
          ).catch(err => this._errorOccured(err));
        }
        else
        {
          this.settingsConfirm = true;
          this.tasksConfirm = true;
          this.UTasksConfirm = true;
        }
      });

    })).catch(err => this._errorOccured(err));


  }



  render() {
    return (
      <View style={styles.base}>
        <View style={styles.content}>
                <Image source={logo}  style={{width: 175, height: 200}}/>

            <Text style={styles.logoText}>Time Manager</Text>
            
        </View>
        <AnimatedLoader
            visible={true}
            overlayColor="rgba(255,255,255,0)"
            
            animationStyle={styles.anim}
            speed={0.8}
            loop= {true}
            
              />
      </View>
    );
  }
}


const styles = StyleSheet.create(
    {
        base :
        {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: () => this.props.configuration.l1,
            backgroundColor: "#fce5e5"

        },
        content:
        {
         
            width: 300,
            height: 350,
            alignItems: "center",

        },
        logoText:
        {
            fontSize: 25,
            fontWeight: "bold",
            color: "#541616",
            marginTop: 10,
        },
        anim:
        {
          height: 60,
          width: 60,
          position: "relative",
          top: 60,
    
        }
    }
);


const mapStateToProps = (state) => {

  return {
    configuration:  state.configuration,
    dataManager: state.dataManager
   }
}

export default connect(mapStateToProps)(Splash);