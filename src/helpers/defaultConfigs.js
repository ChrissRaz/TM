import Store from '../store/ConfigureStore';
import {AsyncStorage, Alert} from 'react-native';


//default routine
export const defaultTasks =  [
    {
        IdTask: null,
        date: null,
        description: "Sleep",
        duree: 14400,
        actif: true,
        history: [],
        childs:  [],
        next: null,
        order: 0,
        notifyBeforeEnding: true,
        notifyBegining: true,
        notifyBeforeEndingDuration: 5

      },
      {
        IdTask: null,
        date: null,
        description: "Works and Study",
        duree: 14400+14400*2,
        actif: false,
        history: [],
        childs:  [],
        next: null,
        order: 1,
        notifyBeforeEnding: true,
        notifyBegining: true,
        notifyBeforeEndingDuration: 5
      },
      
      {
        IdTask: null,
        date: null,
        description: "Divertissement and Others",
        duree: 14400,
        actif: false,
        history: [],
        childs:  [],
        next: null,
        order: 2,
        notifyBeforeEnding: true,
        notifyBegining: false,
        notifyBeforeEndingDuration: 5
      },
      {
        IdTask: null,
        date: null,
        description: "Task4",
        duree: 14400,
        actif: true,
        history: [],
        childs:  [],
        next: null,
        order: 3,
        notifyBeforeEnding: true,
        notifyBegining: true,
        notifyBeforeEndingDuration: 5

      },
      // {
      //   IdTask: null,
      //   date: null,
      //   description: "Task5",
      //   duree: 14400,
      //   actif: false,
      //   history: [],
      //   childs:  [],
      //   next: null,
      //   order: 4,
      //   notifyBeforeEnding: true,
      //   notifyBegining: true,
      //   notifyBeforeEndingDuration: 5
      // },
      
      // {
      //   IdTask: null,
      //   date: null,
      //   description: "Task6",
      //   duree: 14400,
      //   actif: false,
      //   history: [],
      //   childs:  [],
      //   next: null,
      //   order: 5,
      //   notifyBeforeEnding: true,
      //   notifyBegining: false,
      //   notifyBeforeEndingDuration: 5
      // },
      

];


//defaults application config
export const Defaultconfigs = {
    theme: 
    {
        l1: "#541616",
        l2 : "#c64242",
        l3: "#ff7474",
        l4: "#f7c2c2",
        l5: "#fce5e5",
    },
    DarkMode: false,
    notify: true,
    notifyBegining: true,
    notifyBeforeEnding: true,
    notifyJourneyBegining: false,
    notifyBeforeEndingDuration: 5,
    lastIndexTask: 0,
    autoSwitchToDefautlTaskAtEndOfJourney: true,

}

export const defaultUserTasks = { 
  tasks: []
}

//Restauration of all datas
export const restore = async ()=>
{
    await AsyncStorage.setItem("tasks",JSON.stringify(defaultTasks)).then(

    ).catch(err =>  console.warn("Error occured when writing tasks data (defaultconfig): "+err));

    await AsyncStorage.setItem("settings",JSON.stringify(Defaultconfigs)).then(
  
    ).catch(err => console.warn("Error occured when writing settings data (defaultconfig): "+err));

    await AsyncStorage.setItem("userTasks",JSON.stringify(defaultUserTasks)).then(
    
    ).catch(err => console.warn("Error occured when writing userTasks data (defaultconfig): "+err));


    Store.dispatch({type: 'CONFIGURE_TODAY_TASK', value: []});

    Alert.alert("Information", "Application data restored successfuly", [
      {text: 'Ok', onPress: () => console.log("")},

    ],
    {cancelable: true},
    );

};
    
