import React, { Component } from 'react';
import './Chart.css';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import 'chartjs-plugin-datalabels';
import LineChart from '../../components/line-chart';
import { icons } from '../../assets';

class Chart extends Component {

    constructor(props){
        super(props)

        this.state={
            selectedChart : 0,
            selectedTiming: 0,
            title : 'Evolution pendant la journée'
        }
    }

    _initDailyChartProperties=(title, keyMin,  keyMax)=>{
        const { dailyWeather } = this.props;
        return {
            title : title,
            datasets : [
                {
                    borderColor: '#ccc',
                    label: 'Min',
                    data: dailyWeather.daily.map(weather=>weather[keyMin]),
                },
                {
                    borderColor: '#999',
                    label: 'max',
                    data: dailyWeather.daily.map(weather=>weather[keyMax]),
                }
            ],
            labels: dailyWeather.daily.map(weather=>moment(weather.date,"YYYY-MM-DD").format('dddd')),
        }
    }

    _initHourlyChartProperties=(title, key)=>{

        const { dailyWeather, date } = this.props;
        const weather=dailyWeather.hourly
            .filter(weather=>new Date(weather.date)>=new Date(date))
            .slice(0, 8)
        return {
            title : title,
            datasets : [
                {
                    borderColor: '#ccc',
                    label: key,
                    data:weather.map(weather=>weather[key]),
                }
            ],
            labels: weather.map(weather=>weather.hour.slice(0, 5)),
        }
    }

    _displayChart(){
        const chart = this._getChart()
        if(chart){
            return <LineChart  {...chart} />
        }
        else {
            return(<div>Data not resday yet</div>)
        }
    }

    _selectChart(index, key){
        this.setState({
            [key] : index,
        })
    }

    _getChart(){
        const { selectedChart, selectedTiming }=this.state
        const { dailyWeather }=this.props
        let chart
        if(dailyWeather){
            switch (selectedChart) {
                case 0:
                    chart=selectedTiming ==0//0 :daily, 1:hourly
                        ? this._initDailyChartProperties('Température (°C)', 'temp_min', 'temp_max')
                        : this._initHourlyChartProperties('Température (°C)', 'temp')
                    break;
                case 1:
                    chart=selectedTiming ==0
                        ? this._initDailyChartProperties('Pression (hpa)', 'pressure_min', 'pressure_max')
                        : this._initHourlyChartProperties('Pression (hpa)', 'pressure')
                    break;
                case 2:
                    chart=selectedTiming ==0
                        ? this._initDailyChartProperties('Vent (m/s)', 'wind_min', 'wind_max')
                        : this._initHourlyChartProperties('Vent (m/s)', 'wind')
                    break;
                case 3:
                    chart=selectedTiming ==0
                        ? this._initDailyChartProperties('Humidité (%)', 'humidity_min', 'humidity_max')
                        : this._initHourlyChartProperties('Humidité (%)', 'humidity')
                    break;

            }
        }
        return chart;
    }

    render() {
        const { selectedChart, selectedTiming, title } = this.state
        return(
            <div>
                <div className='row-container'>
                    <div className='timing-container'>
                            <button className={selectedTiming==0 ? 'selected' : ''} onClick={()=>this._selectChart(0,'selectedTiming')}>
                                <img src={icons.calendar}/>
                            </button>
                            <button className={selectedTiming==1 ? 'selected' : ''} onClick={()=>this._selectChart(1,'selectedTiming')}>
                                <img src={icons.clock}/>
                            </button>
                            <h4>{title}</h4>
                    </div>
                    <div className='filters-container'>
                        <button className={selectedChart==0 ? 'selected' : ''} onClick={()=>this._selectChart(0, 'selectedChart')}>Température</button>
                        <button className={selectedChart==1 ? 'selected' : ''} onClick={()=>this._selectChart(1, 'selectedChart')}>Pression</button>
                        <button className={selectedChart==2 ? 'selected' : ''} onClick={()=>this._selectChart(2, 'selectedChart')}>Vent</button>
                        <button className={selectedChart==3 ? 'selected' : ''} onClick={()=>this._selectChart(3, 'selectedChart')}>Humidité</button>
                    </div>
                </div>
                {this._displayChart()}
            </div>
        )
    }
}

function mapState(state) {
    const { currentWeather, currentWeatherPending, currentWeatherError,
            dailyWeather, dailyWeatherPending, dailyWeatherError } = state.weather;
    return { currentWeather, currentWeatherPending, currentWeatherError,
            dailyWeather, dailyWeatherPending, dailyWeatherError };
}

export default connect(mapState)(Chart);
