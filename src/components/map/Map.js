import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import { locationActions, weatherActions } from '../../actions';

mapboxgl.accessToken ='pk.eyJ1IjoiYmVzbWEiLCJhIjoiY2s3c2txeDNuMGZ2aTNmcGdwZnkyNmtidiJ9.H0okliaNPLwTS4ar8GW7xw'

class Map extends Component {

    componentDidMount() {
        this._displayMap()
        this._addCurrentLocationControl()
        this._addNavControl()
        const { location }=this.props
        if(location){
            this._showLocation()
        }
    }

    componentDidUpdate(){
        const { location }=this.props
        if(location){
            this._showLocation()
        }
    }

    _displayMap(){
        const {updateLocation}=this.props
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ 3.042048, 36.752887],//Algiers geographical coordinates are used by default as map center
            zoom: 5
        });

        this.map.on('click', e=> {
            //update center and current location marker
            this.map.flyTo({ center: e.lngLat });
            const {lng, lat}=e.lngLat;
            updateLocation({longitude :lng, latitude: lat})
            this._updateWeather(lng,lat)
        });
    }

    //button to move to current location
    _addCurrentLocationControl(){
        const { updateLocation }= this.props
        const userLocationControl=new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                showUserLocation:false,
                trackUserLocation: true
            })
        userLocationControl.on('geolocate',data=>{
            const { longitude, latitude}=data.coords
            updateLocation(data.coords)
            this._updateWeather(longitude,latitude)
        })
        this.map.addControl(userLocationControl)
    }

    //zoom in and zoom out control
    _addNavControl(){
        var nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'top-left');
    }

    //Display a Marker on the current or selected location
    _showLocation(){
        const { longitude, latitude }=this.props.location
        this._setUpMarker(longitude, latitude)
    }

    _setUpMarker(longitude, latitude){
        const { updateLocation }=this.props
        if(this.positionMarker){
            this.positionMarker.setLngLat([longitude,latitude])
        }
        else{
            this.positionMarker = new mapboxgl.Marker({color:'#B43E5A'})
              .setLngLat([longitude, latitude])
              .addTo(this.map);
             this.positionMarker.setDraggable(true)
             this.positionMarker.on('dragend', result=>{
                 const { lng, lat }=result.target._lngLat
                 updateLocation({longitude :lng, latitude: lat})
                 this._setUpMarker({longitude :lng, latitude: lat})
                 this._updateWeather(lng,lat)
             })
         }
        this.map.flyTo({ center: [longitude ,latitude]});
    }

    _updateWeather(longitude,latitude){
        const { getCurrentWeather, getDailyWeather } =this.props
        getCurrentWeather(longitude,latitude)
        getDailyWeather(longitude,latitude)
    }

    render() {
        return (
            <div className='main-container'>
                <div ref={el => this.mapContainer = el} className='map-container' />
            </div>
        )

    }
}

function mapState(state) {
    const { location, currentLocationPending, currentLocationError} = state.location;
    return { location, currentLocationPending, currentLocationError};
}

const actionCreators = {
    updateLocation: locationActions.updateLocation,
    getCurrentWeather: weatherActions.getCurrentWeatherByGeograpgicCoordinates,
    getDailyWeather: weatherActions.getDailyWeatherByGeograpgicCoordinates,
}

export default connect(mapState, actionCreators)(Map);
