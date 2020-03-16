import { reducersConstants } from '../../constants';

export function authentication(state = {}, action) {
    switch(action.type) {
        case reducersConstants.weatherConstants.WEATHER_REQUEST:
        return {
            ...state,
        }
        default:
        return state
    }
}
