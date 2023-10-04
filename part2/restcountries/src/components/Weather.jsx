import weatherService from '../services/openweathermap'
import { useEffect, useState } from 'react';
import WindArrow from './WindArrow';

const Weather = ({ capital }) => {
    const [weatherData, setWeatherData] = useState(null);

    // this effect fetches the weather data from the openweathermap.org API
    // it runs each time the capital prop changes
    useEffect(() => {
        console.log('Weather: capital:', capital);

        weatherService.getWeather(capital)
        .then(data => {
            console.log('Weather: weatherData:', data);
            setWeatherData(data);
        })
        .catch(error => {
            console.log('Weather: ERROR:', error);
            setWeatherData(null);
        });
    }, [capital]);

    // if weatherData is null, show a message
    if (!weatherData) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                Sorry, (currently) no weather data available!
            </div>
        )
    }

    // if weatherData is not null, show the weather data
    const icon = weatherData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <div>temperature: {weatherData.main.temp}° Celsius</div>
            <div>feels like:  {weatherData.main.feels_like}° Celsius</div>
            <div>humidity:    {weatherData.main.humidity}% rel. H</div>
            <div>pressure:    {weatherData.main.pressure}hPa</div>
            <div><img src={iconUrl} alt={weatherData.weather[0].description} /></div>
            <div>{weatherData.weather[0].description}</div>
            <div>wind {weatherData.wind.speed} m/s from {weatherData.wind.deg}°</div>
            <WindArrow wind_dir={weatherData.wind.deg} />
        </div>
    );
}

export default Weather;
