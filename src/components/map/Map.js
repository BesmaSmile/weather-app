import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import './Map.css';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import { weatherActions } from '../../actions';

mapboxgl.accessToken ='pk.eyJ1IjoiYmVzbWEiLCJhIjoiY2s3c2txeDNuMGZ2aTNmcGdwZnkyNmtidiJ9.H0okliaNPLwTS4ar8GW7xw'

class Map extends Component {

    componentDidMount() {
        this._displayMap()
        this._addCurrentLocationControl()
        this._addNavControl()
        this._showCurrentLocation()
    }

    _displayMap(){
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
            this._setUpMarker(lng,lat)
            this._updateWeather(lng,lat)
        });
    }

    //button to move to current location
    _addCurrentLocationControl(){
        const userLocationControl=new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                showUserLocation:false,
                trackUserLocation: true
            })
        userLocationControl.on('geolocate',data=>{
            const { longitude, latitude}=data.coords
            this._setUpMarker(longitude,latitude)
            this._updateWeather(longitude,latitude)
        })
        this.map.addControl(userLocationControl)
    }

    //zoom in and zoom out control
    _addNavControl(){
        var nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'top-left');
    }

    //Display a Marker on the current location
    _showCurrentLocation(){
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(pos=>{
            const crd = pos.coords;
            this._setUpMarker(crd.longitude, crd.latitude)
            this._updateWeather(crd.longitude,crd.latitude)
        }, error=>{
            console.log(error);
        }, options);
    }

    _setUpMarker(longitude, latitude){
        if(this.positionMarker){
            this.positionMarker.setLngLat([longitude,latitude])
        }
        else{
            this.positionMarker = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(this.map);
             this.positionMarker.setDraggable(true)
             this.positionMarker.on('dragend', result=>{
                 const {lng,lat}=result.target._lngLat
                 this._updateWeather(lng,lat)
             })
        }
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


const actionCreators = {
    getCurrentWeather: weatherActions.getCurrentWeatherByGeograpgicCoordinates,
    getDailyWeather: weatherActions.getDailyWeatherByGeograpgicCoordinates
}

export default connect(()=>({}), actionCreators)(Map);
