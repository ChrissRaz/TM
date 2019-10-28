import configure from "./ConfigurationReducer";
import taskUpdate from './TaskReducer';
import DateReducer from "./DateReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({configuration: configure, timer: taskUpdate});


export default rootReducer;