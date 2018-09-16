import React from 'react';
import WeatherContainer from './containers/WeatherContainer';
import LocationSearchContainer from './containers/LocationSearchContainer';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        isLoaded: false,
        error: null,
        location: "Whistler",
        long: "-122.988",
        lat: "50.098",
        weather: [],
    }
  }

  handleLocationChange = (error, isLoaded, long, lat, location) => {

    if(!error){
      isLoaded = false;
    }
        
    this.setState({
        error: error,
        isLoaded: isLoaded,
        location: location,
        long: long,
        lat: lat,
    });
    
  }

  render() {

    const {error, location} = this.state;

    var display = <WeatherContainer 
      long={this.state.long} 
      lat={this.state.lat} 
      />

    if(error){
      display = <div className="text-light mt-5">Error: {error.message}</div>
    }

    return (
      <div className="main-page d-flex flex-column flex-fill">
        <div className="bg flex-fill">
          <div className="h-25"></div>
          <div className="container text-center">
            <h2 className="text-light">{location}</h2>
            <LocationSearchContainer onUpdateLocation={this.handleLocationChange} />
            {display}
          </div>
        </div>
      </div>
    )

  }
}

export default App;