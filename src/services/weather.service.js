import { apiConstants } from '../constants';
import { handleResponse } from '../helpers';

export const weatherService = {
    getCurrentWeatherByGeograpgicCoordinates
};

const commonParams=`units=metric&lang=fr&appid=${apiConstants.OPEN_WEATHER_MAP_KEY}`

function getCurrentWeatherByGeograpgicCoordinates(longitude, latitude) {
    return fetch(`${apiConstants.OPEN_WEATHER_MAP_END_POINT}?lon=${longitude}&lat=${latitude}&${commonParams}`)
    .then(handleResponse);
}
