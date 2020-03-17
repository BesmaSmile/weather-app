import { combineReducers } from 'redux';
import { weather } from './weather.reducer';
import { location } from './weather.location';

const rootReducer = combineReducers({
    weather,
    location
});

export default rootReducer;
