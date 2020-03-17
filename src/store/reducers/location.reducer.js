import { reducersConstants } from '../../constants';

export function location(state = {}, action) {
    switch(action.type) {
        //Current location
        case reducersConstants.CURRENT_LOCATION_REQUEST:
        return {
            ...state,
            currentLocationPending: true
        }
        case reducersConstants.CURRENT_LOCATION_SUCCESS:
        return {
            ...state,
            currentLocationPending: false,
            currentLocation: action.location
        }
        case reducersConstants.CURRENT_LOCATION_FAILURE:
        return {
            ...state,
            currentLocationPending: false,
            currentLocationError : action.error
        }
        default:
        return state
    }
}
