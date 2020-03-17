import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import logo from '../../logo.svg';
import { icons, images } from '../../assets';
import './App.css';
import Map from '../../components/map';
import 'moment/locale/fr';
import Chart from '../../components/chart';
import { locationActions, weatherActions } from '../../actions';
import { Switch, Route, Link } from "react-router-dom";

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            currentTime :moment().format('LTS')
        }
    }

    componentDidMount() {
        const { getCurrentLocation }=this.props
        getCurrentLocation()
        setInterval( () => {
          this.setState({
            currentTime : moment().format('LTS')
          })
        },1000)
    }

    componentDidUpdate(){
        const { location, currentWeather, dailyWeather, getCurrentWeather, getDailyWeather }=this.props
        if(location){
            const { longitude, latitude }=location
            if(!currentWeather){
                getCurrentWeather(longitude, latitude)
            }
            if(!dailyWeather){
                getDailyWeather(longitude, latitude)
            }
        }
    }

    render(){
        const { currentWeather, currentWeatherPending, currentWeatherError,
                dailyWeather, dailyWeatherPending, dailyWeatherError }=this.props
        const { currentTime }=this.state
        moment.locale('fr')
        return (
            <div className='app-container'>
                <Link to="/">Map</Link>
                <Link to="/chart">Chart</Link>
                <div className='row'>
                    <div className='col-md-2'>
                        <div className='card'>
                            {currentWeather && !currentWeatherPending &&
                                <div>
                                    <div>{currentWeather.city}</div>
                                    <div>{moment().format('dddd')}</div>
                                    <div>{moment().format('Do MMMM  YYYY')}</div>
                                    <div> {currentTime}</div>
                                </div>
                            }

                        </div>

                        <div className='card'>
                            {currentWeather && !currentWeatherPending &&
                                <div>
                                    <div  className='row'>
                                        <div className='col-md-6' >

                                                <img src={images.transparent}
                                                    className='weather-image'
                                                    width={60} height={60}
                                                    style={{backgroundImage: `url("http://openweathermap.org/img/w/${currentWeather.icon}.png")`}} />

                                        </div>
                                        <div className='col-md-6'>
                                            {currentWeather.temp} °C
                                        </div>
                                    </div>
                                    <span>{currentWeather.description}</span>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {currentWeather && !currentWeatherPending &&
                                <div className='card-row'>
                                    <img src={icons.pressure}
                                        className='icon'/>
                                    <div>
                                        <div>Pression</div>
                                        <div>{currentWeather.pressure} hpa</div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {currentWeather && !currentWeatherPending &&
                                <div className='card-row'>
                                    <img src={icons.wind}
                                        className='icon'/>
                                    <div>
                                    <div>Vent</div>
                                    <div>{currentWeather.wind} m/s</div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {currentWeather && !currentWeatherPending &&
                                <div className='card-row'>
                                    <img src={icons.humidity}
                                        className='icon'/>
                                    <div>
                                    <div>Humidité</div>
                                    <div>{currentWeather.humidity} %</div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                    <div className='col-md-8'>
                        <div className='top-bar'>
                            <div className='search-container'>
                                <input className='search-input'/>
                            </div>
                            <div className='buttons-container'>
                                <button className='chart-button'>
                                    <img src={icons.chart} className="App-logo" alt="Evolution" />
                                </button>
                                <button className='map-button'>
                                    <img src={icons.map} className="App-logo" alt="Evolution" />
                                </button>
                            </div>
                        </div>
                        <Switch>
                              <Route path="/chart">
                                    <Chart/>
                              </Route>
                              <Route path="/">
                                  <Map/>
                              </Route>
                        </Switch>
                    </div>
                    <div className='col-md-2'>
                    {
                        dailyWeather && !dailyWeatherPending &&
                        dailyWeather.daily.filter(weather=>moment(weather.date,"YYYY-MM-DD").format('Do MMMM  YYYY') != moment().format('Do MMMM  YYYY'))
                        .map((weather,index)=>{
                            return (
                                <div key={index} className='card'>
                                    <div>{moment(weather.date,"YYYY-MM-DD").format('dddd')}</div>
                                    <div>{moment(weather.date,"YYYY-MM-DD").format('Do MMMM  YYYY')}</div>
                                    <div  className='card-row'>
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
    const { location, currentLocationPending, currentLocationError} = state.location;
    const { currentWeather, currentWeatherPending, currentWeatherError,
            dailyWeather, dailyWeatherPending, dailyWeatherError} = state.weather;
    return { location, currentLocationPending, currentLocationError,
            currentWeather, currentWeatherPending, currentWeatherError,
            dailyWeather, dailyWeatherPending, dailyWeatherError };
}

const actionCreators = {
    getCurrentLocation: locationActions.getCurrentLocation,
    getCurrentWeather: weatherActions.getCurrentWeatherByGeograpgicCoordinates,
    getDailyWeather: weatherActions.getDailyWeatherByGeograpgicCoordinates,
}

export default connect(mapState, actionCreators)(App);
