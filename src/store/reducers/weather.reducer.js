import { reducersConstants } from '../../constants';

export function weather(state = {}, action) {
    switch(action.type) {
        case reducersConstants.WEATHER_REQUEST:
        return {
            ...state,
            pending: true
        }
        case reducersConstants.WEATHER_SUCCESS:
        return {
            ...state,
            pending: false,
            weather: action.weather
        }
        case reducersConstants.WEATHER_FAILURE:
        return {
            ...state,
            pending: false,
            error : action.error
        }
        default:
        return state
    }
}
