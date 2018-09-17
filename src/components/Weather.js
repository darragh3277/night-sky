import React from 'react'

const Weather = (props) => (
  <div className='container mt-5'>
    <div className='row'>
      {props.weather.map(day => (
        <div className='col' key={day.date}>
          {day.icon && <img className='img-fluid' src={day.icon} alt='Card cap' />}
          <div className='text-light rounded mt-3'>
            {day.date && <h5 className='text-center'>{day.date}</h5>}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Weather
