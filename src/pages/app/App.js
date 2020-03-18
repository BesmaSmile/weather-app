import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import logo from '../../logo.svg';
import { icons, images } from '../../assets';
import './App.css';
import CountrySearchInput from '../../components/country-search-input';
import Map from '../../components/map';
import 'moment/locale/fr';
import Chart from '../chart';
import { locationActions, weatherActions } from '../../actions';
import { Switch, Route, NavLink } from "react-router-dom";

import Autocomplete from 'react-autocomplete';

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            currentTime :moment().format('LTS'),
            askedForCurrentWeather : false,
            askedForDailyWeather : false,
            date : moment().format('YYYY-MM-DD')
        }

    }

    componentDidMount() {
        const { getCurrentLocation, getCurrentWeather, getDailyWeather }=this.props
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
    }

    _selectDate(date){
        this.setState({
            date: date
        })
    }

    _getSelectedDateWeather(){
        if(moment(this.state.date,"YYYY-MM-DD").format('Do MMMM  YYYY') == moment().format('Do MMMM  YYYY')){
            return this.props.currentWeather
        }else{
            return {
                ...this.props.dailyWeather.daily.find(weather=>weather.date
                    ==moment(this.state.date,"YYYY-MM-DD").format('YYYY-MM-DD')),
                city : this.props.dailyWeather.daily.city,
                country : this.props.dailyWeather.daily.country
            }
        }
    }

    render(){
        const { currentWeather, currentWeatherPending, currentWeatherError,
                dailyWeather, dailyWeatherPending, dailyWeatherError }=this.props
        const { currentTime, date}=this.state
        let weather
        if(currentWeather && !currentWeatherPending)
        {
            weather=this._getSelectedDateWeather()
        }
        moment.locale('fr')
        return (
            <div className='app-container'>
                <div className='row'>
                    <div className='col-md-2'>
                        <div className='card'>
                            {weather && !currentWeatherPending &&
                                <div>
                                    <div>{weather.city}{weather.country!=weather.city ? ' ,'+weather.country : '' }</div>
                                    <div>{moment().format('dddd')}</div>
                                    <div>{moment().format('Do MMMM  YYYY')}</div>
                                    <div> {currentTime}</div>
                                </div>
                            }

                        </div>

                        <div className='card'>
                            {weather && !currentWeatherPending &&
                                <div>
                                    <div  className='row'>
                                        <div className='col-md-6' >

                                                <img src={images.transparent}
                                                    className='weather-image'
                                                    width={60} height={60}
                                                    style={{backgroundImage: `url("http://openweathermap.org/img/w/${weather.icon}.png")`}} />

                                        </div>
                                        <div className='col-md-6'>
                                            {weather.temp} °C
                                        </div>
                                    </div>
                                    <span>{weather.description}</span>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {weather && !currentWeatherPending &&
                                <div className='card-row'>
                                    <img src={icons.pressure}
                                        className='icon'/>
                                    <div>
                                        <div>Pression</div>
                                        <div>{weather.pressure} hpa</div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {weather && !currentWeatherPending &&
                                <div className='card-row'>
                                    <img src={icons.wind}
                                        className='icon'/>
                                    <div>
                                    <div>Vent</div>
                                    <div>{weather.wind} m/s</div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {weather && !currentWeatherPending &&
                                <div className='card-row'>
                                    <img src={icons.humidity}
                                        className='icon'/>
                                    <div>
                                    <div>Humidité</div>
                                    <div>{weather.humidity} %</div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                    <div className='col-md-8'>
                        <div className='top-bar'>
                            <div className='search-container'>

                            <CountrySearchInput/>
                            </div>
                            <div className='buttons-container'>
                                <NavLink exact to="/" activeClassName='selected'>
                                    <button className='img-button'>
                                        <img src={icons.map}/>
                                    </button>
                                </NavLink>
                                <NavLink exact to="/chart" activeClassName='selected'>
                                    <button className='img-button'>
                                        <img src={icons.chart}/>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <Map/>
                            </Route>
                            <Route exact path="/chart">
                                <Chart date={date}/>
                            </Route>

                        </Switch>
                    </div>
                    <div className='col-md-2'>
                    {
                        dailyWeather && !dailyWeatherPending &&
                        dailyWeather.daily.map((weather,index)=>{
                        //dailyWeather.daily.filter(weather=>moment(weather.date,"YYYY-MM-DD").format('Do MMMM  YYYY') != moment().format('Do MMMM  YYYY'))
                        //.map((weather,index)=>{
                            return (
                                <div key={index} className='card'>
                                    <div>{moment(weather.date,"YYYY-MM-DD").format('dddd')}</div>
                                    <div>{moment(weather.date,"YYYY-MM-DD").format('Do MMMM  YYYY')}</div>
                                    <div  className='card-row' onClick={()=>this._selectDate(moment(weather.date,"YYYY-MM-DD").format('YYYY-MM-DD'))}>
                                        <img src={images.transparent}
                                            className='weather-image'
                                            width={60} height={60}
                                            style={{backgroundImage: `url("http://openweathermap.org/img/w/${weather.icon}.png")`}} />
                                        <div>
                                            {weather.temp_max} °C_
                                        </div>
                                        <div>
                                            {weather.temp_min} °C
                                        </div>
                                    </div>
                                    <div>
                                        {weather.description}
                                    </div>
                                </div>
                            )
                        })
                    }

                    </div>
                </div>
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
