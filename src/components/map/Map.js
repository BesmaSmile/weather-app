import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';

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
            this.positionMarker.setLngLat(e.lngLat)
            //update weather data......
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
            //update weather data......
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
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(pos=>{
            const crd = pos.coords;
            this.positionMarker = new mapboxgl.Marker()
              .setLngLat([crd.longitude, crd.latitude])
              .addTo(this.map);
             this.positionMarker.setDraggable(true)
             this.positionMarker.on('dragend', result=>{
                 //update weather data
             })
        }, error=>{
            console.log(error);
        }, options);
    }


    render() {
        return (
            <div className='main-container'>
                <div ref={el => this.mapContainer = el} className='map-container' />
            </div>
        )
    }
}

export default Map;
