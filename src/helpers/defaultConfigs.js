import Store from '../store/ConfigureStore';
import {AsyncStorage, Alert} from 'react-native';


//default routine
export const defaultTasks =  [
    {
        IdTask: null,
        date: null,
        description: "Sleep",
        duree: 28800,
        actif: false,
        history: [],
        childs:  [],
        next: null,
        notifyBeforeEnding: true,
        notifyBegining: true,
        notifyBeforeEndingDuration: 5

      },
      {
        IdTask: null,
        date: null,
        description: "Works and Study",
        duree: 28800,
        actif: true,
        history: [],
        childs:  [],
        next: null,
        notifyBeforeEnding: true,
        notifyBegining: true,
        notifyBeforeEndingDuration: 5
      },
      
      {
        IdTask: null,
        date: null,
        description: "Divertissement and Others",
        duree: 28800,
        actif: false,
        history: [],
        childs:  [],
        next: null,
        notifyBeforeEnding: true,
        notifyBegining: false,
        notifyBeforeEndingDuration: 5
      },

];


//defaults application config
export const Defaultconfigs = {
    DarkMode: false,
    notify: true,
    notifyBegining: true,
    notifyBeforeEnding: true,
    notifyBeforeEndingDuration: 5,
    lastIndexTask: 0,
}

export const defaultUserTasks = { 
  tasks: []
}

//Restauration of all datas
export const restore = async ()=>
{
    await AsyncStorage.setItem("tasks",JSON.stringify(defaultTasks)).then(

    ).catch(err =>  console.warn("Error occured when writing tasks data (defaultconfi): "+err));

    await AsyncStorage.setItem("settings",JSON.stringify(Defaultconfigs)).then(
  
    ).catch(err => console.warn("Error occured when writing settings data (defaultconfi): "+err));

    await AsyncStorage.setItem("userTasks",JSON.stringify(defaultUserTasks)).then(
    
    ).catch(err => console.warn("Error occured when writing userTasks data (defaultconfi): "+err));


    Store.dispatch({type: 'CONFIGURE_TODAY_TASK', value: []});

    Alert.alert("Information", "Application data restored successfuly", [
      {text: 'Ok', onPress: () => console.log("")},

    ],
    {cancelable: true},
    );

};
    
