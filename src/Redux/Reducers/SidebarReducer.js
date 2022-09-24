import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    sidebar:[]
}
export const sidebarReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.GET_SIDEBAR :
            return {state, category : payload};
        default:
            return state;
    }
}