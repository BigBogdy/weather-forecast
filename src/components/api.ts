import { AxiosRequestConfig } from 'axios';

export const citiesApi = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '2db4b5eb2dmsh661e3673136b37fp16ece1jsnbd93155823eb',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export const CITIES_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_KEY = '8a43614746c1db1b6091acf51fd4992b';
