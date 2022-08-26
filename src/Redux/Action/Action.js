import { ActionTypes } from "../Constants/ActionTypes";
export const getUser= (user) => {
    return {
        type: ActionTypes.SELECCTED_USER,
        payload: user
    }
};
export const getLocation = (locations) => {
    return {
        type: ActionTypes.GET_LOCATION,
        payload: locations
    }
};

export const getSelectedLocationId = (locationId) => {
    return {
        type: ActionTypes.GET_SELECTED_LOCATION_ID,
        payload: locationId
    }
};