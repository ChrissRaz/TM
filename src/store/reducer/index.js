import configure from "./ConfigurationReducer";
import taskUpdate from './TaskReducer';
import DateReducer from "./DateReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({configuration: configure, dataManager: taskUpdate});


export default rootReducer;