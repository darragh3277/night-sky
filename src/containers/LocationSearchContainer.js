import React from 'react';
import LocationSearch from '../components/LocationSearch';

const GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json?key=";

class LocationSearchContainer extends React.Component{

    getCoordinates = (address) => {

        var url = `${GEO_URL}AIzaSyBTpTu_YJixxVIaKRNZxIxW4IWSVny7p20&address=${address}`;
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
                    var long = result.results[0].geometry.location.lng;
                    var lat = result.results[0].geometry.location.lat;
                    var location = result.results[0].formatted_address;
                }else{
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
        this.getCoordinates(e.target.elements.location.value);
    }

    render(){
        
        return (
            <LocationSearch onLocationChange={this.handleLocationChange} />
        )

    }

}

export default LocationSearchContainer;