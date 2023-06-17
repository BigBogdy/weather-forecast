import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const useStyles = makeStyles()((theme) => ({
  paper: {
    width: '100%',
    maxWidth: 760,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    fontFamily: 'Montserrat',
  },
  current: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  icon: {
    width: '100%',
    height: 'auto',
    maxWidth: '100px',
  },
}));

const CurrentWeather = ({ data }: any) => {
  console.log(data);
  const updatedIcon = data.weather[0].icon.slice(0, -1) + 'd';
  const infoData = [
    {
      label: 'Humidity',
      value: `${data.main.humidity}%`,
      url: '/icons/humidity-icon.svg',
    },
    {
      label: 'Wind',
      value: `${data.wind.speed} m/s`,
      url: '/icons/wind-icon.svg',
    },
    {
      label: 'Pressure',
      value: `${data.main.pressure} hPa`,
      url: '/icons/pressure-icon.svg',
    },
  ];

  const { classes } = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography sx={{ fontWeight: 600, color: 'rgb(114, 126, 142)' }}>
        Current Weather
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 3 }}>
        <Box>
          <Typography
            sx={{
              ml: 2,
              fontWeight: 600,
              fontSize: 20,
              color: 'rgb(57, 107, 174)',
            }}
          >
            {data.city}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <img
              style={{
                width: 100,
                height: 100,
                marginRight: 20,
              }}
              src={`icons/${updatedIcon}.svg`}
              alt="icon-weather"
            />
            <Typography
              sx={{
                fontSize: 100,
                fontWeight: 200,
                lineHeight: 1,
                color: 'rgb(74, 111, 161)',
              }}
            >
              {Math.round(data.main.temp)}&deg;C
            </Typography>
          </Box>
          <Typography
            sx={{ fontWeight: 700, color: 'rgb(123, 152, 178)', fontSize: 20 }}
          >
            {data.weather[0].description}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              color: 'rgb(74, 111, 161)',
              fontWeight: 600,
              fontSize: 18,
              mb: 2,
            }}
          >
            Feels like {Math.floor(data.main.feels_like)}&deg;C
          </Typography>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <img
              style={{ marginRight: 5 }}
              src="/icons/high-icon.svg"
              alt="arrowUp"
            />
            <Typography
              sx={{ mr: 2, color: 'rgb(48, 128, 200)', fontWeight: 600 }}
            >
              {Math.floor(data.main.temp_max)}&deg;C
            </Typography>
            <img
              style={{ marginRight: 5 }}
              src="/icons/low-icon.svg"
              alt="arrowUp"
            />
            <Typography sx={{ color: 'rgb(48, 128, 200)', fontWeight: 600 }}>
              {Math.floor(data.main.temp_min)}&deg;C
            </Typography>
          </Box>
          {infoData.map((item, index) => (
            <Box sx={{ display: 'flex' }} key={index}>
              <img
                style={{ marginRight: 8, marginBottom: 7 }}
                src={item.url}
                alt="arrowUp"
              />
              <Typography
                sx={{
                  color: 'rgb(123, 152, 178)',
                  fontWeight: 600,
                  mr: 1,
                  mb: 1,
                }}
              >
                {item.label}:
              </Typography>
              <Typography sx={{ color: 'rgb(48, 128, 200)', fontWeight: 600 }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default CurrentWeather;
