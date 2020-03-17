import { reducersConstants } from '../constants';
import { locationService } from '../services';


export const locationActions = {
    getCurrentLocation,
    updateLocation
};

function getCurrentLocation(callback) {
    return dispatch => {
        dispatch(request());
        locationService.getCurrentLocation(location=>{
            dispatch(success(location.coords));
            callback(location.coords)
        }, error=>{
            dispatch(failure(error.message));
        })
    };

    function request() { return { type: reducersConstants.CURRENT_LOCATION_REQUEST} }
    function success(location) { return { type: reducersConstants.CURRENT_LOCATION_SUCCESS, location } }
    function failure(error) { return { type:reducersConstants.CURRENT_LOCATION_FAILURE, error } }
}


function updateLocation(location) {
    return dispatch => {
            dispatch({
                type: reducersConstants.UPDATE_LOCATION,
                location
            });
    };
}
