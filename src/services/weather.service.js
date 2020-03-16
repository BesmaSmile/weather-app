import { apiConstants } from '../constants';
import { handleResponse } from '../helpers';

export const weatherService = {
    getWeather
};

function getWeather() {
    return fetch(`${apiConstants.OPEN_WEATHER_MAP_END_POINT}`).then(handleResponse);
}
