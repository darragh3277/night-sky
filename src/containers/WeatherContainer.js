import React from 'react';
import LocationSearch from '../components/LocationSearch';
import Weather from '../components/Weather';

const WEATHER_PROXY = "https://cors-anywhere.herokuapp.com/";
const WEATHER_URL = "https://api.darksky.net/forecast/";

const GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json?key=";

class WeatherContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            location: null,
            weather: []
        }
    }

    getCoordinates = (address) => {

        var url = `${GEO_URL}AIzaSyBTpTu_YJixxVIaKRNZxIxW4IWSVny7p20&address=${address}`;

        const opts = {
            method: 'GET',
        };

        fetch(url, opts)
          .then(res => res.json())
          .then(
            (result) => {
                
                if(result.status === "OK"){
                    var long = result.results[0].geometry.location.lng;
                    var lat = result.results[0].geometry.location.lat;
                    var location = result.results[0].formatted_address;
                    this.setState({
                        location: location,
                        error: null
                    });
                    this.getWeather(lat, long)
                }else{
                    this.setState({
                        isLoaded: true,
                        location: "Oops!",
                        error: {"message":"Location not found"},
                      });
                }
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        );

    }

    getWeather = async (lat, long) =>{

        this.setState({
            isLoaded: false
        });

        if(typeof long === "undefined" || typeof long === "undefined"){
            lat = "50.098";
            long = "-122.988";
        }

        var url = `${WEATHER_PROXY}${WEATHER_URL}${process.env.REACT_APP_SECRET_KEY}/${lat},${long}`;

        const opts = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'charset':'utf-8',
            },
        };

        fetch(url, opts)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                weather: this.parseData(result.daily.data),
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        );

    }

    parseData(data){
        var parsedData = [];

        parsedData = data.map(obj => {
            return {
                "date":this.getFormattedDate(obj.time, obj.timezone),
                "icon":this.getIcon(obj.cloudCover),
            }
        })

        return parsedData;
    }

    getIcon(clouds){      
        var icon = "../images/clear-night.png";
        if (clouds > 0.30 && clouds < 0.60){
            icon = "../images/partial-cloud.png";
        }else if (clouds >= 0.60){
            icon = "../images/overcast.png";
        }

        return icon;
    }

    getFormattedDate(unixTime, timezone){
        var dateObj = new Date(unixTime*1000);
        var formattedDate = new Intl.DateTimeFormat('en-GB', {
            weekday: 'short',
            month: 'short', 
            day: 'numeric',
            timezone: timezone
          }).format(dateObj);

        return formattedDate;
    }

    handleLocationChange = e => {
        e.preventDefault();

        this.getCoordinates(e.target.elements.location.value);
    }

    getBrowserCoordinates(position){
        return {
            "long":position.coords.longitude,
            "lat":position.coords.latitude,
        }
    }

    componentDidMount(){

        var coords = [];

        if (navigator.geolocation) {
            coords = navigator.geolocation.getCurrentPosition(this.getBrowserCoordinates);
        }

        console.log(coords);

        this.getWeather();
    }

    render(){

        const { error, isLoaded, location } = this.state;

        var display = <Weather weather={this.state.weather} />;
        if(error){
            display = <p className="text-light mt-5">Error: {error.message}</p>;
        } else if (!isLoaded) {
            display = <p className="text-light mt-5">Loading...</p>;
        }
        
        return (
            <div className="container text-center">
                <h2 className="text-light">{location}</h2>
                <LocationSearch onLocationChange={this.handleLocationChange} />
                {display}
            </div>
        )
        
    }
}

export default WeatherContainer;