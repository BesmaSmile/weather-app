import React, { Component } from 'react';
import './CountrySearchInput.css';
import { locationActions, weatherActions } from '../../actions';
import { countryCodes, countryLocations } from '../../constants';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';

class CountrySearchInput extends Component {
    constructor(props){
        super(props)
        this.state={
            value: '',
            suggestions: []
        }
        this.options=this._mapCountries()
    }

    _mapCountries(){
        return countryLocations.map(country=>({
            code : country.country_code,
            name : countryCodes[country.country_code],
            latitude : country.latlng[0],
            longitude: country.latlng[1]
        }))
    }
    _getSuggestions = value => {
        console.log(value);
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.options.filter(option =>
            option.name && option.name.toLowerCase().slice(0, inputLength) === inputValue
        )
    }

    _getSuggestionValue = suggestion => suggestion;

    _renderSuggestionsContainer({ containerProps, children, query }) {
        return (
            <div {...containerProps}>
                {children}
            </div>
        );
    }
    _renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    )

    onChange = (event, change) => {
        const { updateLocation, getCurrentWeather, getDailyWeather }=this.props
        if(change.method=='click')
        {
            this.setState({
                value: change.newValue.name
            })
            const {longitude, latitude}=change.newValue
            updateLocation({longitude, latitude})
            getCurrentWeather(longitude,latitude)
            getDailyWeather(longitude,latitude)
        }else{
            this.setState({
                value: change.newValue
            })
        }

        //updateLocation()

    }


     onSuggestionsFetchRequested = ({ value }) => {
         this.setState({
             suggestions: this._getSuggestions(value)
         })
     }

     onSuggestionsClearRequested = () => {
         this.setState({
             suggestions: []
         });
     };

     render() {
         const{ value, suggestions }=this.state
         const inputProps = {
             placeholder: 'Rechercher un pays..',
             value,
             onChange: this.onChange
         };
         return (
             <Autosuggest
                 suggestions={suggestions}
                 onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                 onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                 getSuggestionValue={this._getSuggestionValue}
                 renderSuggestion={this._renderSuggestion}
                 renderSuggestionsContainer={this._renderSuggestionsContainer}
                 inputProps={inputProps}
               />
         )
     }
}

const actionCreators = {
    updateLocation: locationActions.updateLocation,
    getCurrentWeather: weatherActions.getCurrentWeatherByGeograpgicCoordinates,
    getDailyWeather: weatherActions.getDailyWeatherByGeograpgicCoordinates,
}

export default connect(()=>({}), actionCreators)(CountrySearchInput);
