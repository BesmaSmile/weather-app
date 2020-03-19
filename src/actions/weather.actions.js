import { reducersConstants, countryCodes } from '../constants';
import { weatherService } from '../services';
import { capitalizeFirstLetter } from '../helpers';

export const weatherActions = {
    getCurrentWeatherByGeograpgicCoordinates,
    getDailyWeatherByGeograpgicCoordinates
};

function getCurrentWeatherByGeograpgicCoordinates(longitude,latitude) {
    return dispatch => {
        dispatch(request());
        weatherService.getCurrentWeatherByGeograpgicCoordinates(longitude,latitude)
        .then(weather => {
            const currentWeather={
                country :countryCodes[weather.sys.country],
                city :weather.name,
                temp : weather.main.temp,
                description:  capitalizeFirstLetter(weather.weather[0].description),
                pressure:weather.main.pressure,
                humidity:weather.main.humidity,
                wind:weather.wind.speed,
                icon:weather.weather[0].icon,
            }
            dispatch(success(currentWeather));
        },error => {
            dispatch(failure(error.toString()));
        });
    };

    function request() { return { type: reducersConstants.CURRENT_WEATHER_REQUEST} }
    function success(weather) { return { type: reducersConstants.CURRENT_WEATHER_SUCCESS, weather } }
    function failure(error) { return { type:reducersConstants.CURRENT_WEATHER_FAILURE, error } }
}

function getDailyWeatherByGeograpgicCoordinates(longitude,latitude) {
    return dispatch => {
        dispatch(request());
        weatherService.getDailyWeatherByGeograpgicCoordinates(longitude,latitude)
        .then(weather => {
            const dailyWeather=weather.list.map(element=>(
                {
                    temp : element.main.temp,
                    wind : element.wind.speed,
                    pressure:element.main.pressure,
                    humidity:element.main.humidity,
                    description: capitalizeFirstLetter(element.weather[0].description),
                    icon:element.weather[0].icon,
                    date : element.dt_txt.split(' ')[0],
                    hour : element.dt_txt.split(' ')[1],
                })
            )
            dispatch(success({
                daily : calculateDailyAverageWeather(dailyWeather),
                hourly : dailyWeather,
                city : weather.city.name,
                country: countryCodes[weather.city.country],
            }));
        },error => {
            dispatch(failure(error.toString()));
        });

    };

    function request() { return { type: reducersConstants.DAILY_WEATHER_REQUEST} }
    function success(weather) { return { type: reducersConstants.DAILY_WEATHER_SUCCESS, weather } }
    function failure(error) { return { type:reducersConstants.DAILY_WEATHER_FAILURE, error } }
}

function calculateDailyAverageWeather(dailyWeather) {
    const distinctDays=dailyWeather
            .map(element=>element.date)
            .filter((date, index, self)=> self.indexOf(date) === index)
    const dailyTemp=distinctDays.map(date=>{
        const currentDailyWeather=dailyWeather.filter(weather=>weather.date===date)
        const temps=currentDailyWeather.map(weather=>(weather.temp))
        const pressures=currentDailyWeather.map(weather=>(weather.pressure))
        const humidities=currentDailyWeather.map(weather=>(weather.humidity))
        const winds=currentDailyWeather.map(weather=>(weather.wind))
        const mostFrequentWeather=currentDailyWeather.sort((w1,w2) =>currentDailyWeather.filter(w => w.description===w1.description).length
                - currentDailyWeather.filter(w => w.description===w2.description).length).pop()
        return {
            date: date,
            temp : Math.round((temps.reduce((temp1,temp2) => temp1 + temp2,0)/temps.length)),
            temp_min : Math.min(...temps),
            temp_max: Math.max(...temps),
            pressure : Math.round((pressures.reduce((p1,p2) => p1 + p2,0)/pressures.length)),
            pressure_min : Math.min(...pressures),
            pressure_max: Math.max(...pressures),
            humidity : Math.round((humidities.reduce((h1,h2) => h1 + h2,0)/humidities.length)),
            humidity_min : Math.min(...humidities),
            humidity_max: Math.max(...humidities),
            wind : Math.round((winds.reduce((w1,w2) => w1 + w2,0)/winds.length)),
            wind_min : Math.min(...winds),
            wind_max: Math.max(...winds),
            description : mostFrequentWeather.description,
            icon: mostFrequentWeather.icon
        }
    })
    return dailyTemp
}
