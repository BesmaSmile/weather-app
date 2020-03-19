import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { icons, images } from '../../assets';
import './App.css';
import CountrySearchInput from '../../components/country-search-input';
import Map from '../../components/map';
import 'moment/locale/fr';
import Chart from '../chart';
import { locationActions, weatherActions } from '../../actions';
import { Switch, Route, NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from '../../helpers';
import { SemipolarLoading, SolarSystemLoading,} from 'react-loadingg';
import Autocomplete from 'react-autocomplete';

const WeatherLoading=(waiting)=>{
    return (
        <div className='loading-container'>
            <SolarSystemLoading color={waiting ? ' #B43E5A' : '#ddd'}/>
        </div>
    )
}

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            currentTime :moment().format('LTS'),
            askedForCurrentWeather : false,
            askedForDailyWeather : false,
            date : moment().format('YYYY-MM-DD'),
            selectedDay : 0,
            isLoading: true
        }

    }

    componentDidMount() {
        const { getCurrentLocation, getCurrentWeather, getDailyWeather }=this.props
        setTimeout(()=> {
            this.setState({
                isLoading:false
            })
            getCurrentLocation((location)=>{
                const { longitude, latitude }=location
                getCurrentWeather(longitude, latitude)
                getDailyWeather(longitude, latitude)
            })
            setInterval( () => {
              this.setState({
                currentTime : moment().format('LTS')
              })
          },1000)
        }, 3000);
    }

    _displayCurrentWeatherLoading(){
        const {currentWeather, currentWeatherPending, currentWeatherError,
            currentLocationPending, currentLocationError}=this.props
        if(currentWeatherPending || currentWeatherError
            ||(!currentWeather && (currentLocationPending || currentLocationError) ))//weather depends on current location
        return (
            <div className='loading-container'>
                <SolarSystemLoading color={currentWeatherPending||currentLocationPending ? ' #B43E5A' : '#ddd'}/>
            </div>
        )
    }

    _displayDailyWeatherLoading(){
        const {dailyWeather,  dailyWeatherPending, dailyWeatherError,
            currentLocationPending, currentLocationError}=this.props
        if(dailyWeatherPending || dailyWeatherError
            ||(!dailyWeather && (currentLocationPending || currentLocationError) ))//weather depends on current location
        return (
            [0,1,2,3,4,5].map(i=>{
                return (
                    <div key={i} className='card'>
                        <div className='loading-container'>
                            <SolarSystemLoading color={dailyWeatherPending||currentLocationPending ? ' #B43E5A' : '#ddd'}/>
                        </div>
                    </div>
                )
            })

        )
    }

    _selectDate(index,date){
        this.setState({
            date: date,
            selectedDay: index
        })
    }

    _getSelectedDateWeather(){
        if(moment(this.state.date,"YYYY-MM-DD").format('Do MMMM  YYYY') === moment().format('Do MMMM  YYYY')){
            return this.props.currentWeather
        }else{
            if(this.props.dailyWeather)
                return {

                    ...this.props.dailyWeather.daily.find(weather=>weather.date
                        === moment(this.state.date,"YYYY-MM-DD").format('YYYY-MM-DD')),
                    city : this.props.dailyWeather.city,
                    country : this.props.dailyWeather.country
                }
        }
    }

    render(){
        const { currentWeather, currentWeatherPending,
                dailyWeather, dailyWeatherPending }=this.props
        const { currentTime, date, selectedDay, isLoading}=this.state
        let weather
        if(currentWeather && !currentWeatherPending)
        {
            weather=this._getSelectedDateWeather()
        }
        moment.locale('fr')
        return (
            <div className='app-container'>
            {!isLoading &&
                <div className='row appeared'>
                    <div className='col-md-2'>
                        <div className='card'>
                            {weather && !currentWeatherPending &&
                                <div className='card-inner'>
                                    {(weather.city || weather.country) && <div className='default-text city'>{weather.city}{weather.country!==weather.city ? ' ,'+weather.country : '' }</div>}
                                    {!weather.city && !weather.country && <div className='default-text city'>Endroit unconnu</div>}

                                    <div className='default-text'>{capitalizeFirstLetter(moment().format('dddd'))} {moment().format('Do MMMM  YYYY')}</div>
                                    <div className='default-text'> {currentTime}</div>
                                </div>
                            }
                            {this._displayCurrentWeatherLoading()}

                        </div>

                        <div className='card'>
                            {weather && !currentWeatherPending &&
                                <>
                                <div className='card-inner'>
                                    <div className='weather-day'>{capitalizeFirstLetter(moment(date).format('dddd'))}</div>
                                    <div  className='row'>
                                        <div className='col-md-6' >
                                                <img src={images.transparent} alt=''
                                                    className='weather-image'
                                                    width={60} height={60}
                                                    style={{backgroundImage: `url("http://openweathermap.org/img/w/${weather.icon}.png")`}} />

                                        </div>
                                        <div className='col-md-6 weather-value temp-value'>
                                            {weather.temp} <span className='degree'>°C</span>
                                        </div>
                                    </div>
                                    <span className='default-text'>{weather.description}</span>
                                </div>
                                <div className='divider'></div>
                                <div className='card-row'>
                                    <img src={icons.pressure} alt=''
                                        className='icon'/>
                                    <div className='card-inner'>
                                        <div className='weather-title'>Pression</div>
                                        <div className='weather-value'>{weather.pressure} hpa</div>
                                    </div>
                                </div>
                                <div className='card-row'>
                                    <img src={icons.wind} alt=''
                                        className='icon'/>
                                    <div className='card-inner'>
                                    <div className='weather-title'>Vent</div>
                                    <div className='weather-value'>{weather.wind} m/s</div>
                                    </div>
                                </div>
                                <div className='card-row'>
                                    <img src={icons.humidity} alt=''
                                        className='icon'/>
                                    <div className='card-inner'>
                                    <div className='weather-title'>Humidité</div>
                                    <div className='weather-value'>{weather.humidity} %</div>
                                    </div>
                                </div>
                                </>
                            }
                            {this._displayCurrentWeatherLoading()}

                        </div>

                    </div>
                    <div className='col-md-8'>
                        <div className='top-bar'>
                            <div className='search-container'>

                            <CountrySearchInput/>
                            <img src={icons.search} alt=''/>
                            </div>
                            <div className='buttons-container'>

                                <NavLink exact to="/" activeClassName='selected'>
                                    <button className='img-button'>
                                        <img src={icons.chart} alt=''/>
                                    </button>
                                </NavLink>
                                <NavLink exact to="/map" activeClassName='selected'>
                                    <button className='img-button'>
                                        <img src={icons.map} alt=''/>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <Chart date={date}/>
                            </Route>
                            <Route exact path="/map">
                                <Map/>
                            </Route>

                        </Switch>
                    </div>
                    <div className='col-md-2 daily-weather'>
                    {
                        dailyWeather && !dailyWeatherPending &&
                        dailyWeather.daily.map((weather,index)=>{
                            return (
                                <div key={index} className={selectedDay === index ? 'card selected' : 'card'}
                                    onClick={()=>this._selectDate(index, moment(weather.date,"YYYY-MM-DD").format('YYYY-MM-DD'))}>
                                    <div className='card-inner'>
                                        <div className='weather-day'>{capitalizeFirstLetter(moment(weather.date,"YYYY-MM-DD").format('dddd'))}</div>
                                        <div className='default-text'>{moment(weather.date,"YYYY-MM-DD").format('Do MMMM  YYYY')}</div>
                                        <div  className='card-row' >
                                            <img src={images.transparent} alt=''
                                                className='weather-image'
                                                width={60} height={60}
                                                style={{backgroundImage: `url("http://openweathermap.org/img/w/${weather.icon}.png")`}} />
                                            <div className='max-temp'>
                                                {weather.temp_max}°
                                            </div>
                                            <div className='min-temp'>
                                                {weather.temp_min}°
                                            </div>
                                        </div>
                                        <div className='default-text'>
                                            {weather.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {this._displayDailyWeatherLoading()}
                    </div>
                </div>
            }
            {isLoading &&
                <SemipolarLoading color={'#B43E5A'}/>
            }
            </div>
      );
    }


}

function mapState(state) {
    const { currentLocationPending, currentLocationError} = state.location;
    const { currentWeather, currentWeatherPending, currentWeatherError,
            dailyWeather, dailyWeatherPending, dailyWeatherError} = state.weather;
    return { currentLocationPending, currentLocationError,
            currentWeather, currentWeatherPending, currentWeatherError,
            dailyWeather, dailyWeatherPending, dailyWeatherError };
}

const actionCreators = {
    getCurrentLocation: locationActions.getCurrentLocation,
    getCurrentWeather: weatherActions.getCurrentWeatherByGeograpgicCoordinates,
    getDailyWeather: weatherActions.getDailyWeatherByGeograpgicCoordinates,
}

export default connect(mapState, actionCreators)(App);
