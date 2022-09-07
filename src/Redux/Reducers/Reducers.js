import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { locationReducer, locationIdReducer } from "./LocationReducer";
import { categoryReducer } from "./CategoryReducer";

const reactReducers = combineReducers({
    userReducer: userReducer,
    locationReducer: locationReducer,
    locationIdReducer: locationIdReducer,
    categoryReducer: categoryReducer
})

export default reactReducers;