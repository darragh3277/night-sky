import React from 'react';
import Weather from '../components/Weather';

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
        var url = `${WEATHER_PROXY}${WEATHER_URL}${process.env.REACT_APP_SECRET_KEY}/${this.props.lat},${this.props.long}`;
        var error = null;
        var weather = [];
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
                weather = this.parseData(result.daily.data);
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

    componentDidMount(){
        this.getWeather();
    }

    componentDidUpdate(nextProps){
        if(nextProps !== this.props){
            this.setState({isLoaded: false});
            this.getWeather();
        }
    }

    render(){

        const {error, isLoaded} = this.state;

        if(error){
            return(<div className="text-light mt-5">Error: {error.message}</div>);
        }else if(!isLoaded){
            return (<div className="text-light mt-5">Loading...</div>);
        }

        return (
            <Weather weather={this.state.weather} />
        );
    }
}

export default WeatherContainer;