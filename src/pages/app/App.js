import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import logo from '../../logo.svg';
import { icons, images } from '../../assets';
import './App.css';
import Map from '../../components/map';
import 'moment/locale/fr';

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            currentTime :moment().format('LTS')
        }
    }
    componentDidMount() {
        setInterval( () => {
          this.setState({
            currentTime : moment().format('LTS')
          })
        },1000)
    }
    render(){
        const { weather, pending, error }=this.props
        const { currentTime }=this.state
        moment.locale('fr')
        console.log(weather);
        return (
            <div className='app-container'>
                <div className='row'>
                    <div className='col-md-2'>
                        <div className='card'>
                            {weather && !pending &&
                                <div>
                                    <div>{weather.name}</div>
                                    <div>{moment().format('dddd')}</div>
                                    <div>{moment().format('Do MMMM  YYYY')}</div>
                                    <div> {currentTime}</div>
                                </div>
                            }

                        </div>

                        <div className='card'>
                            {weather && !pending &&
                                <div>
                                    <div  className='row'>
                                        <div className='col-md-6' >

                                                <img src={images.transparent}
                                                    className='weather-image'
                                                    width={60} height={60}
                                                    style={{backgroundImage: `url("http://openweathermap.org/img/w/${weather.weather[0].icon}.png")`}} />

                                        </div>
                                        <div className='col-md-6'>
                                            {weather.main.temp} °C
                                        </div>
                                    </div>
                                    <span>{weather.weather[0].description}</span>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {weather && !pending &&
                                <div className='card-row'>
                                    <img src={icons.pressure}
                                        className='icon'/>
                                    <div>
                                        <div>Pression</div>
                                        <div>{weather.main.pressure} hpa</div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {weather && !pending &&
                                <div className='card-row'>
                                    <img src={icons.wind}
                                        className='icon'/>
                                    <div>
                                    <div>Vent</div>
                                    <div>{weather.wind.speed} m/s</div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='card'>
                            {weather && !pending &&
                                <div className='card-row'>
                                    <img src={icons.humidity}
                                        className='icon'/>
                                    <div>
                                    <div>Humidité</div>
                                    <div>{weather.main.humidity} %</div>
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
                        <Map/>
                    </div>
                    <div className='col-md-2'>
                    <div className='card'>
                        <span>Samedi</span>
                        <span>12 mars</span>
                        <div  className='row'>
                            <div className='col-md-6'>
                                weather icon
                            </div>
                            <div className='col-md-6'>
                                20 °C
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
      );
    }

}
function mapState(state) {
    const { weather, pending, error } = state.weather;
    return { weather, pending, error };
}



export default connect(mapState)(App);
