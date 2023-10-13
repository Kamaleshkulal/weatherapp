
import './card.index.css';
import Reactf, { useState, useEffect } from 'react';
import Forecast from './Forecast';
function Card({ data }) {

  const [currentTime, setCurrentTime] = useState(new Date());
  const updateTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const hr = currentTime.getHours();
  const min = currentTime.getMinutes();
  const sec = currentTime.getSeconds();

  const amOrPm = hr >= 12 ? 'PM' : 'AM';
  const hour = hr % 12 || 12;

  const formattedTime = `${hour}:${min}:${sec} ${amOrPm}`;


  const icon = data.weather[0].icon;
  let imageUrl = '';
  if (icon === '01d') {
    imageUrl = 'http://openweathermap.org/img/wn/01d@2x.png';
  } else if (icon === '01n') {
    imageUrl = 'http://openweathermap.org/img/wn/01n@2x.png';
  } else if (icon === '02d') {
    imageUrl = 'data:image/png;base64,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';
  } else if (icon === '02n') {
    imageUrl = 'http://openweathermap.org/img/wn/02n@2x.png';
  } else if (icon === '03d') {
    imageUrl = 'http://openweathermap.org/img/wn/03d@2x.png';
  } else if (icon === '03n') {
    imageUrl = 'http://openweathermap.org/img/wn/03n@2x.png';
  } else if (icon === '04d') {
    imageUrl = 'http://openweathermap.org/img/wn/04d@2x.png';
  } else if (icon === '04n') {
    imageUrl = 'http://openweathermap.org/img/wn/04n@2x.png';
  } else if (icon === '09d') {
    imageUrl = 'http://openweathermap.org/img/wn/09d@2x.png';
  } else if (icon === '09n') {
    imageUrl = 'http://openweathermap.org/img/wn/09n@2x.png';
  } else if (icon === '10d') {
    imageUrl = 'http://openweathermap.org/img/wn/10d@2x.png';
  } else if (icon === '10n') {
    imageUrl = 'http://openweathermap.org/img/wn/10n@2x.png';
  } else if (icon === '11d') {
    imageUrl = 'http://openweathermap.org/img/wn/11d@2x.png';
  } else if (icon === '11n') {
    imageUrl = 'http://openweathermap.org/img/wn/11n@2x.png';
  } else if (icon === '13d') {
    imageUrl = 'http://openweathermap.org/img/wn/13d@2x.png';
  } else if (icon === '13n') {
    imageUrl = 'http://openweathermap.org/img/wn/13n@2x.png';
  } else if (icon === '50d') {
    imageUrl = 'http://openweathermap.org/img/wn/50d@2x.png';
  } else if (icon === '50n') {
    imageUrl = 'http://openweathermap.org/img/wn/50n@2x.png';
  }


  const offsetInSeconds = parseInt(data.timezone);
  const utcTime = "12:00:00";
  const [hours, minutes, seconds] = utcTime.split(':').map(Number);
  let localHours = hours + Math.floor(offsetInSeconds / 3600);
  let localMinutes = minutes + Math.floor((offsetInSeconds % 3600) / 60);
  let localSeconds = seconds + (offsetInSeconds % 60);

  if (localSeconds >= 60) {
    localSeconds -= 60;
    localMinutes += 1;
  }

  if (localMinutes >= 60) {
    localMinutes -= 60;
    localHours += 1;
  }

  const ampm = localHours >= 12 ? 'PM' : 'AM';
  const localHours12 = localHours % 12 || 12;
  const TimeZone = `${String(localHours12).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}`;


  const [city, country] = data.city.trim().split(',');
  let nationUrl = '';
  if (country.trim() === 'Australia') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/1200px-Flag_of_Australia.svg.png';
  } else if (country.trim() === 'India') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  } else if (country.trim() === 'People\'s Republic of China') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1599px-Flag_of_the_People%27s_Republic_of_China.svg.png';
  } else if (country.trim() === 'United States of America') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/2880px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png';
  } else if (country.trim() === 'Andorra') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/250px-Flag_of_Andorra.svg.png';
  } else if (country.trim() === 'Bangladesh') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/250px-Flag_of_Bangladesh.svg.png';
  } else if (country.trim() === 'Pakistan') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/250px-Flag_of_Pakistan.svg.png';
  } else if (country.trim() === 'Afghanistan') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg/400px-Flag_of_Afghanistan_%282013%E2%80%932021%29.svg.png';
  } else if (country.trim() === 'Sri Lanka') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/250px-Flag_of_Sri_Lanka.svg.png';
  } else if (country.trim() === 'Nepal') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/190px-Flag_of_Nepal.svg.png';
  } else if (country.trim() === 'United Kingdom') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/250px-Flag_of_the_United_Kingdom_%281-2%29.svg.png';
  } else if (country.trim() === 'Argentina') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/250px-Flag_of_Argentina.svg.png';
  } else if (country.trim() === 'Brazil') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png';
  } else if (country.trim() === 'Russia') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/250px-Flag_of_Russia.svg.png';
  } else if (country.trim() === 'Mexico') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/250px-Flag_of_Mexico.svg.png';
  } else if (country.trim() === 'Ethiopia') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/250px-Flag_of_Ethiopia.svg.png';
  } else if (country.trim() === 'Japan') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png';
  } else if (country.trim() === 'Philippines') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/260px-Flag_of_the_Philippines.svg.png';
  } else if (country.trim() === 'Egypt') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/250px-Flag_of_Egypt.svg.png';
  } else if (country.trim() === 'Democratic Republic of the Congo') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/250px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png';
  } else if (country.trim() === 'Vietnam') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png';
  } else if (country.trim() === 'Iran') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/250px-Flag_of_Iran.svg.png';
  } else if (country.trim() === 'Turkey') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png';
  } else if (country.trim() === 'Germany') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/250px-Flag_of_Germany.svg.png';
  } else if (country.trim() === 'Thailand') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/250px-Flag_of_Thailand.svg.png';
  } else if (country.trim() === 'France') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/250px-Flag_of_France.svg.png';
  } else if (country.trim() === 'Tanzania') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tanzania.svg/250px-Flag_of_Tanzania.svg.png';
  } else if (country.trim() === 'South Africa') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/250px-Flag_of_South_Africa.svg.png';
  } else if (country.trim() === 'Italy') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/250px-Flag_of_Italy.svg.png';
  } else if (country.trim() === 'Kenya') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/250px-Flag_of_Kenya.svg.png';
  } else if (country.trim() === 'Myanmar') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/250px-Flag_of_Myanmar.svg.png';
  } else if (country.trim() === 'Colombia') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/250px-Flag_of_Colombia.svg.png';
  } else if (country.trim() === 'South Korea') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png';
  } else if (country.trim() === 'Uganda') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/250px-Flag_of_Uganda.svg.png';
  } else if (country.trim() === 'Sudan') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Sudan.svg/250px-Flag_of_Sudan.svg.png';
  } else if (country.trim() === 'New Zealand') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/250px-Flag_of_New_Zealand.svg.png';
  } else if (country.trim() === 'Qatar') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/270px-Flag_of_Qatar.svg.png';
  } else if (country.trim() === 'United Arab Emirates') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/510px-Flag_of_the_United_Arab_Emirates.svg.png';
  } else if (country.trim() === 'Jamaica') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Jamaica.svg/250px-Flag_of_Jamaica.svg.png';
  } else if (country.trim() === 'India') {
    nationUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  }
  // else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // } else if(country.trim() === 'India'){
  //   nationUrl= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1599px-Flag_of_India.svg.png';
  // }


  let now = new Date();
  let options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  let formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);

  return (
    <>
      <div className="flex space-x-4 mt-10">
        <div className="cardContainer">
          <div className="card">
            <p className="city">{data.city}</p>
            <p className="weather">{data.weather[0].description}</p>
            <svg
              xmlSpace="preserve"
              viewBox="0 0 100 100"
              height="50px"
              width="50px"
              y="0px"
              x="0px"
              id="Layer_1"
              version="1.1"
              className="weather"
            >
              <image
                href={imageUrl}
                width="100" height="100" alt=""
              />
            </svg>
            <p className="temp">{data.main.temp}°C</p>
            <div className="minmaxContainer">
              <div className="min">
                <p className="minHeading">Min</p>
                <p className="minTemp">{data.main.temp_min}°C</p>
              </div>
              <div className="max">
                <p className="maxHeading">Max</p>
                <p className="maxTemp">{data.main.temp_max}°C</p>
              </div>
            </div>
          </div>
        </div>


        <div className="cardContainer card2x">
          <div className="card card2x">
            <div className='text-4xl'>Time Zone</div>
            <p>In {data.city} (GMT+{TimeZone})</p>
            <svg
              xmlSpace="preserve"
              viewBox="0 0 100 100"
              height="50px"
              width="50px"
              y="0px"
              x="0px"
              id="Layer_1"
              version="1.1"
              className="weather"
            >
              <image
                href={nationUrl}
                width="100" height="100" alt=""
              />

            </svg>
            <p className="text-xl">{formattedDate}</p>
            <p className='text-xl '>{formattedTime}</p>
          </div>
        </div>


        <div className="cardContainer ">
          <div className="card">
            <div className=''>
              <p>Wind</p>
            </div>
            <div>
              <p>{data.wind.speed} km/h</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="40" height="40"
              fill="currentColor"
              class="bi bi-wind"
              viewBox="0 0 16 16"
              className=''>
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
            </svg>
            <div className='mt-2 relative'>
              <p className=''>Humidity</p>
            </div>
            <div>
              <p>{data.main.humidity}%</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor" class="bi bi-water" viewBox="0 0 16 16">
              <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
