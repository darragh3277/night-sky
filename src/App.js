import React from 'react';
import WeatherContainer from './containers/WeatherContainer';

class App extends React.Component {

  render() {

    return (
      <div className="main-page d-flex flex-column flex-fill">
        <div className="bg flex-fill">
          <div className="h-25"></div>
          <WeatherContainer />
        </div>
      </div>
    )

  }
}

export default App;