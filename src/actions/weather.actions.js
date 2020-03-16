import { reducersConstants } from '../constants';
import { weatherService } from '../services';


export const weatherActions = {
    getCurrentWeatherByGeograpgicCoordinates
};

function getCurrentWeatherByGeograpgicCoordinates(longitude,latitude) {
    return dispatch => {
        dispatch(request());
        weatherService.getCurrentWeatherByGeograpgicCoordinates(longitude,latitude)
        .then(weather => {
                dispatch(success(weather));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function request() { return { type: reducersConstants.WEATHER_REQUEST} }
    function success(weather) { return { type: reducersConstants.WEATHER_SUCCESS, weather } }
    function failure(error) { return { type:reducersConstants.WEATHER_FAILURE, error } }
}
