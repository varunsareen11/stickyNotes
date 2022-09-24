import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { locationReducer, locationIdReducer } from "./LocationReducer";
import { categoryReducer } from "./CategoryReducer";
import { sidebarReducer } from "./SidebarReducer";

const reactReducers = combineReducers({
    userReducer: userReducer,
    locationReducer: locationReducer,
    locationIdReducer: locationIdReducer,
    categoryReducer: categoryReducer,
    sidebarReducer: sidebarReducer,
})

export default reactReducers;