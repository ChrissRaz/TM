import { AsyncStorage } from "react-native";
import * as h from '../../helpers/funcs';
// import  * as d  from '../../helpers/defaultConfigs';


const Themes = {
    default: 
    {
        l1: "#541616",
        l2 : "#c64242",
        l3: "#ff7474",
        l4: "#f7c2c2",
        l5: "#fce5e5",
    },
    dark:
    {
        l1: "#000000",
        l2 : "#4d4d4d",
        l3: "#5f5f5f",
        l4: "#808080",
        l5: "#969696",
    }
};


let initialConfig = {
    theme: Themes.default,
    DarkMode:false,
    notify: true,
    notifyBegining: true,
    notifyBeforeEnding: true,
    notifyJourneyBegining: false,
    autoSwitchToDefautlTaskAtEndOfJourney: true,
    notifyBeforeEndingDuration: 5,
    lastIndexTask: 0,
};


// h.findAll("settings").then(
//     date => {

//         console.log("loading configs");

//         initialConfig = {
//             ...initialConfig,
//             ...data,
//             theme:data.DarkMode? Themes.dark:Themes.default
//         }
//         // initialConfig.theme=data.DarkMode? Themes.dark:Themes.default;
//         // initialConfig.DarkMode=data.DarkMode;
//         // initialConfig.notify= data.notify;
//         // initialConfig.notifyBegining = data.notifyBegining;
//         // initialConfig.notifyBeforeEnding= data.notifyBeforeEnding;
//         // initialConfig.notifyJourneyBegining= data.notifyJourneyBegining;
//         // initialConfig.autoSwitchToDefautlTaskAtEndOfJourney = data.autoSwitchToDefautlTaskAtEndOfJourney;
//         // initialConfig.notifyBeforeEndingDuration = data.notifyBeforeEndingDuration;
//         // initialConfig.lastIndexTask = data.lastIndexTask;
//     }
// );

console.log(initialConfig);

function  configure(state=initialConfig, action) 
{
    let nextState;

    switch (action.type) {
        case "DEFAULT_THEME":
            nextState = {
                ...state,
                theme: Themes.default,
                DarkMode: false
            };

            h.add("settings",nextState).catch(err => console.warn("Error when updatings settings: "+err)).then(
                dt =>
                AsyncStorage.getItem("settings").then(
                    d => console.log(JSON.parse(d))
                )
            );
            break;
        
        case "DARK_THEME":
                nextState = {
                    ...state,
                    theme: Themes.dark,
                    DarkMode: true
                };
            

                h.add("settings",nextState).catch(err => console.warn("Error when updatings settings: "+err)).then(
                    dt =>
                    AsyncStorage.getItem("settings").then(
                        d => console.log(JSON.parse(d))
                    )
                );

                
                break;

        case "UPDATE_SETTINGS":
            //value must be the settings with modification

                nextState ={
                    ...state,
                    ...action.value
                };

                h.add("settings",nextState).catch(err => console.warn("Error when updatings settings: "+err));

            break;
    
        default:
            nextState = state;
            break;

        
    }

    return nextState;
}





export default configure;