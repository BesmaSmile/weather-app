import { reducersConstants } from '../constants';
import { locationService } from '../services';


export const locationActions = {
    getCurrentLocation,
};

function getCurrentLocation() {
    return dispatch => {
        dispatch(request());
        locationService.getCurrentLocation(location=>{
            const {longitude, latitude }=location.coords
            dispatch(success({longitude, latitude }));
        }, error=>{
            dispatch(failure(error.message));
        })
    };

    function request() { return { type: reducersConstants.CURRENT_LOCATION_REQUEST} }
    function success(location) { return { type: reducersConstants.CURRENT_LOCATION_SUCCESS, location } }
    function failure(error) { return { type:reducersConstants.CURRENT_LOCATION_FAILURE, error } }
}
