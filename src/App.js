import React from 'react';
import WeatherContainer from './containers/WeatherContainer';
import LocationSearchContainer from './containers/LocationSearchContainer';

class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    location: null,
    long: null,
    lat: null,
  }

  handleLocationChange = (error, isLoaded, long, lat, location) => {     
    this.setState({
      error,
      isLoaded: !error ? false : isLoaded,
      location,
      long,
      lat,
    });
  }

  render() {
    const {error, location, long, lat} = this.state;
    return (
      <div className="main-page d-flex flex-column flex-fill">
        <div className="bg flex-fill">
          <div className="h-25"></div>
          <div className="container text-center">
            <h2 className="text-light">{location}</h2>
            <LocationSearchContainer 
              onUpdateLocation={this.handleLocationChange} 
              onNavigatorLoad={this.handleNavigatorLoad}
              />
              {error ? (
                <div className="text-light mt-5">Error: {error.message}</div>
              ) : (
                <WeatherContainer 
                  long={long} 
                  lat={lat} 
                  location={location}
                />
              )}
          </div>
        </div>
      </div>
    )
  }
}

export default App;