import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  paper: { borderRadius: 15, opacity: 0.8, width: 800, height: 210 },
  day: {
    fontWeight: 'bold',
  },
  icon: {
    width: '60px',
    height: '60px',
    marginBottom: '10px',
  },
}));
const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const ForecastWeather = ({ data }: any) => {
  const { classes } = useStyles();
  const filteredDataByTime = data.list
    .map((item: any) => item)
    .filter((item: any) => item.dt_txt.includes('15:00:00'));

  const today = new Date().getDay();

  const nextDays = daysOfWeek
    .slice(today, daysOfWeek.length)
    .concat(daysOfWeek.slice(0, today));

  return (
    <Paper className={classes.paper}>
      <Box sx={{ padding: '20px' }}>
        <Typography
          sx={{
            fontWeight: 600,
            color: 'rgb(114, 126, 142)',
            fontSize: 16,
            mb: 0.75,
          }}
        >
          5-Day Forecast
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {filteredDataByTime.map((item: any, i: number) => (
            <>
              <Box
                sx={{
                  width: 150,
                  m: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ color: 'rgb(69, 129, 197)', fontWeight: 600 }}
                >
                  {nextDays[i]}
                </Typography>
                <img
                  src={`icons/${item.weather[0].icon.slice(0, -1) + 'd'}.svg`}
                  style={{ width: 50 }}
                  alt="icon-weather"
                />
                <Typography
                  sx={{
                    color: 'rgb(74, 111, 161)',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {item.weather[0].description}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ color: 'rgb(74, 111, 161)' }}>
                    {Math.round(item.main.temp)}&deg;/
                  </Typography>
                  <Typography sx={{ color: 'rgb(74, 111, 161)' }}>
                    {Math.round(item.main.temp)}&deg;
                  </Typography>
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default ForecastWeather;
