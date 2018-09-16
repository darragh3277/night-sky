import React from 'react';
import LocationSearch from '../components/LocationSearch';

const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?key=";
const GEOLOCATE_URL = "https://www.googleapis.com/geolocation/v1/geolocate?key=";

class LocationSearchContainer extends React.Component{

    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }else{
            this.getLocationByIP();
        }
    }

    showPosition = (position) => {
        this.getLocationByCoordinates(position.coords.latitude, position.coords.longitude);
    }

    getLocationByIP = () => {
        var url = `${GEOLOCATE_URL}${process.env.REACT_APP_GEO_KEY}`;

        const opts = {
            method: 'POST',
        };

        fetch(url, opts)
        .then(res => res.json())
        .then((result) => {
            this.getLocationByCoordinates(result.location.lat, result.location.lng);
        });
    }

    getLocationByCoordinates = (lat, long) => {

        var url = `${GEOCODE_URL}${process.env.REACT_APP_GEO_KEY}&latlng=${lat},${long}`;
        var error = null;
        var location = null;

        const opts = {
            method: 'GET',
        };

        fetch(url, opts)
            .then(res => res.json())
            .then(
            (result) => {

                var isLoaded = true;
                
                if(result.status === "OK"){
                    location = result.results[0].formatted_address;
                }else{
                    location = "Not Found";
                    error = {"message":"Location not found"};
                }

                this.props.onNavigatorLoad(error, isLoaded, long, lat, location);
            },
            (error) => {
                var isLoaded = true;
                location = "Not Found";
                this.props.onNavigatorLoad(error, isLoaded, long, lat, location);
            }
        );

    }

    getLocationByAddress = (address) => {

        var url = `${GEOCODE_URL}${process.env.REACT_APP_GEO_KEY}&address=${address}`;
        var long = null;
        var lat = null;
        var location = null;
        var error = null;

        const opts = {
            method: 'GET',
        };

        fetch(url, opts)
            .then(res => res.json())
            .then(
            (result) => {

                var isLoaded = true;
                
                if(result.status === "OK"){
                    long = result.results[0].geometry.location.lng;
                    lat = result.results[0].geometry.location.lat;
                    location = result.results[0].formatted_address;
                }else{
                    location = "Not Found";
                    error = {"message":"Location not found"};
                }

                this.props.onUpdateLocation(error, isLoaded, long, lat, location);
            },
            (error) => {
                var isLoaded = true;
                this.props.onUpdateLocation(error, isLoaded, long, lat, location);
            }
        );

    }

    handleLocationChange = (e) => {
        e.preventDefault();
        this.getLocationByAddress(e.target.elements.location.value);
    }

    render(){
        
        return (
            <LocationSearch onLocationChange={this.handleLocationChange} />
        )

    }

}

export default LocationSearchContainer;