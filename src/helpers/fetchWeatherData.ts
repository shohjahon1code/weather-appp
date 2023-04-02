import { API_KEY } from "../service/api.service";

async function fetchWeatherData(city='tashkent') {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

export default fetchWeatherData;