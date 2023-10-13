import React from 'react';
import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import {GEO_API_URL , geoApiOptions}  from '../../../../api/api';
import './card.index.css';
const Search = ({onSearchChange}) => {
  const [search, setSearch] = useState(null);
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?mainPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        const uniqueCityNames = new Set();
        const uniqueCities = response.data.filter((city) => {
          const cityName = `${city.name}, ${city.country}`;
          if (!uniqueCityNames.has(cityName)) {
            uniqueCityNames.add(cityName);
            return true;
          }
          return false;
        });
  
        return {
          options: uniqueCities.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      });
  };
  
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return (
    <>
    <AsyncPaginate
      placeholder = "search"
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className='w-1/2 custom-async-paginate'
      /> 
    </>
  )
}

export default Search