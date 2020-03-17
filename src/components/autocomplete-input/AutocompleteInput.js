import React, { Component } from 'react';
import './AutocompleteInput.css';

import Autosuggest from 'react-autosuggest';

class AutocompleteInput extends Component {
    constructor(props){
        super(props)
        this.state={
            value: '',
            suggestions: []
        }
    }

    _getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const {options}=this.props

        return inputLength === 0 ? [] : options.filter(option =>
            option.name && option.name.toLowerCase().slice(0, inputLength) === inputValue
        )
    }

    _getSuggestionValue = suggestion => suggestion.name;

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

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        })
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

export default AutocompleteInput;
