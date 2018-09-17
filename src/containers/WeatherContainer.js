import React from 'react';
import Weather from '../components/Weather';
import {mapWeatherData} from '../utilities.js'

const WEATHER_PROXY = "https://cors-anywhere.herokuapp.com/";
const WEATHER_URL = "https://api.darksky.net/forecast/";

class WeatherContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            weather: [],
            isLoaded: false,
            error: null
        }
    }

    getWeather = () =>{

        if(!this.props.lat || !this.props.long){
            return;
        }

        var url = `${WEATHER_PROXY}${WEATHER_URL}${process.env.REACT_APP_DARKSKY_KEY}/${this.props.lat},${this.props.long}`;
        var isLoaded = false;

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
                isLoaded = true;
                var weather = mapWeatherData(result.daily.data);
                this.setState({
                    weather: weather,
                    isLoaded: isLoaded
                });
            },
            (error) => {
                isLoaded = true;
                this.setState({
                    error: error,
                    isLoaded: isLoaded
                });
            }
        );

    }

    componentDidMount(){
        this.getWeather();
    }

    componentDidUpdate(nextProps){
        if(nextProps.long !== this.props.long
        && nextProps.lat !== this.props.lat){
            this.setState({isLoaded: false});
            this.getWeather();
        }
    }

    render(){

        const {error, isLoaded} = this.state;

        if(error){
            return(<div className="text-light mt-5">Error: {error.message}</div>);
        }else if(!this.props.location){
            return (<div className="text-light mt-5"></div>);
        }else if(!isLoaded){
            return (<div className="text-light mt-5">Loading...</div>);
        }

        return (
            <Weather weather={this.state.weather} />
        );
    }
}

export default WeatherContainer;