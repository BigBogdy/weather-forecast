import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { CITIES_API_URL } from './api';
import { citiesApi } from '../components/api';

import { debounce } from 'lodash';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import '../index.css';

const useStyles = makeStyles()((theme) => ({
  input: {
    width: 800,
    marginBottom: 20,
    '& input': {
      fontSize: 18,
      color: 'rgb(114, 126, 142)',
      padding: 0,
      fontFamily: 'Montserrat',
      fontWeight: 400,
      '&:hover': {
        outline: 'none',
      },
    },
    position: 'relative',
    '& > div': {
      borderRadius: 26,
      backgroundColor: '#fff',
      padding: 7,
    },
  },
  suggestionBox: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 758,
    padding: '10px 20px',
    height: 100,
    margin: '40px 0px 0px 0px',
    overflowY: 'scroll',
    borderRadius: '0px 0px 5px 5px',
    '::-webkit-scrollbar': {
      width: 6,
    },
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#6b6b6b',
      border: '2px solid #6b6b6b',
      borderRadius: 10,
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
  },
}));

const Search = ({ onSearchChange }: any) => {
  const { classes } = useStyles();
  const [inputValue, setInputValue] = useState<string>('');
  const [data, setData] = useState([]);

  const fetchCities = useCallback(
    debounce(async (value) => {
      const res = await axios.get(
        `${CITIES_API_URL}/cities?minPopulation=300000&namePrefix=${value}`,
        citiesApi
      );
      const extractedData = res.data.data.map((item: any) => ({
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
      }));
      setData(extractedData);
    }, 1000),
    []
  );

  const handleInputChange = (value: any) => {
    setInputValue(value);
    fetchCities(value);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          sx={{
            ...(data?.length > 0 && {
              '.MuiInputBase-root': {
                borderRadius: '10px 10px 0px 0px',
              },
              'MuiTextField-root-input': {
                color: '#333333',
              },
            }),
          }}
          className={classes.input}
          placeholder="Search for location"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                    cursor: 'pointer',
                  }}
                  src="../icons/Location.svg"
                  alt="location"
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <img
                  style={{
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                  }}
                  src="../icons/Search.svg"
                  alt="search"
                />
              </InputAdornment>
            ),
          }}
        />
        {data?.length > 0 && (
          <Box className={classes.suggestionBox}>
            {data.map((item: any, i) => (
              <Typography
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  cursor: 'pointer',
                  mb: 0.5,
                  '&:hover': {
                    color: 'gray',
                  },
                }}
                key={i}
                onClick={() => {
                  onSearchChange(item);
                  setData([]);
                }}
              >
                {item.name}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Search;
