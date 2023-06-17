import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import { WEATHER_KEY, WEATHER_URL } from './components/api';
import ForecastWeather from './components/ForecastWeather';
import { Box, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';

function App() {
  const [currWeather, setCurrWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const onSearchChange = (searchData: any) => {
    const { name: city, longitude: lon, latitude: lat } = searchData;

    const fetchCurrentWeather = fetch(
      `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
    );

    const fetchForecastWeather = fetch(
      `${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
    );
    Promise.all([fetchCurrentWeather, fetchForecastWeather])
      .then(async (res) => {
        const currentRes = await res[0].json();
        const forecastRes = await res[1].json();

        setCurrWeather({ city, ...currentRes });
        setForecastWeather({ city, ...forecastRes });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url(icons/Background.jpg)',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container>
          <Search onSearchChange={onSearchChange} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {currWeather && <CurrentWeather data={currWeather} />}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {forecastWeather && <ForecastWeather data={forecastWeather} />}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
