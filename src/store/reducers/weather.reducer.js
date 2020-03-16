import { reducersConstants } from '../../constants';

export function weather(state = {}, action) {
    switch(action.type) {
        //Current weather
        case reducersConstants.CURRENT_WEATHER_REQUEST:
        return {
            ...state,
            currentWeatherPending: true
        }
        case reducersConstants.CURRENT_WEATHER_SUCCESS:
        return {
            ...state,
            currentWeatherPending: false,
            currentWeather: action.weather
        }
        case reducersConstants.CURRENT_WEATHER_FAILURE:
        return {
            ...state,
            currentWeatherPending: false,
            currentWeatherError : action.error
        }

        //Daily weather
        case reducersConstants.DAILY_WEATHER_REQUEST:
        return {
            ...state,
            dailyWeatherPending: true
        }
        case reducersConstants.DAILY_WEATHER_SUCCESS:
        return {
            ...state,
            dailyWeatherPending: false,
            dailyWeather: action.weather
        }
        case reducersConstants.DAILY_WEATHER_FAILURE:
        return {
            ...state,
            dailyWeatherPending: false,
            dailyWeatherError : action.error
        }
        default:
        return state
    }
}
