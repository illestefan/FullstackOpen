import axios from "axios";
const weatherapi_url="http://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const getWeather = (capital) => {
    const api_key = import.meta.env.VITE_WEATHERMAP_API_KEY
    const url = `${weatherapi_url}${capital}&APPID=${api_key}`;
    const request = axios.get(url);
    console.log(request);
    return request.then(response => response.data);
}

export default { getWeather }

