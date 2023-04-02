import React from 'react';
import classes from './weather.module.css';
import { WeatherCardProps } from './weather-card.props';
import dateBuilder from '../../helpers/convertTime';
import { kelvinToCelsius } from '../../helpers/kelvinToCelcus';
const WeatherCard = ({ getWeather }: WeatherCardProps): JSX.Element => {

  return (
    <div className={classes.wrapper}>
      <div className={classes.city}>
        <div className='flex'>
          <h2>{getWeather.name}</h2>,
          <h2>{getWeather.sys.country}</h2>
        </div>
        <div>
          {dateBuilder(new Date())}
        </div>
      </div>
      <div className={classes.weatherInfo}>
        <div> <p className={classes.degree}>{kelvinToCelsius(getWeather.main.temp)}°c</p>
          <p className={classes.action}>{getWeather.weather && getWeather.weather[0].main}</p></div>
        <div>
          <img width={150} height={100} src={`http://openweathermap.org/img/w/${getWeather.weather[0]?.icon}.png`} alt="name" />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
