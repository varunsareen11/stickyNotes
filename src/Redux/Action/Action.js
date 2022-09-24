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
export const getCategory = (category) => {
    return {
        type: ActionTypes.GET_CATEGORY,
        payload: category
    }
};
export const getSidebar = (sidebar) => {
    return {
        type: ActionTypes.GET_SIDEBAR,
        payload: sidebar
    }
};