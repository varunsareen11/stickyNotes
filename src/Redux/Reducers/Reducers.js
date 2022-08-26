import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { locationReducer, locationIdReducer } from "./LocationReducer";

const reactReducers = combineReducers({
    userReducer: userReducer,
    locationReducer: locationReducer,
    locationIdReducer: locationIdReducer
})

export default reactReducers;