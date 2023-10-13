
"use client";
import React, { useState } from 'react';
import Avatar from '../app/avatar.png';
import Logo from '../app/logo.png';
import Image from 'next/image';
import { ImSearch } from 'react-icons/im'
import Search from './Search';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../../../../api/api'
import Card from './Card';
import Forecast from './Forecast';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWeather, setCurrentWeatherFetch] = useState(null);
  const [forecast, setForecastFetch] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const handleSearchChange = (searchData) => {
  };
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeatherFetch({ city: searchData.label, ...weatherResponse });
        setForecastFetch({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  return (

    <> 
      <nav className="p-4 bg-blue-400">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">
          <Image src={Logo} className="rounded-full h-14 w-14 bg-gradient-to-tr from-transparent via-bg-blue-400 to-transparent" alt="logo" />
        </div>

        <Search onSearchChange={handleOnSearchChange} className='custom-async-paginate' />

        <div className="text-sm text-gray-800">
          <button onClick={toggleDropdown}>
            <Image src={Avatar} className="rounded-full h-14 w-14" alt="User Avatar" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg z-10">
              <div className="py-2">
                
                 <Link href={'/auth'}>
                    <button
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-300"
                      onClick={closeDropdown}
                    >
                  Sign Up
                </button>
              </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-300"
                  onClick={closeDropdown}
                >
                  Sign In
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-300"
                  onClick={closeDropdown}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
      {currentWeather && <Card data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </>
  );
};

export default Navbar;
