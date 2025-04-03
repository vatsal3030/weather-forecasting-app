import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import WeatherPopup from './WeatherPopup';

const WeatherMap = ({ onWeatherSelect }) => {
  const [marker, setMarker] = useState(null);
  const [weather, setWeather] = useState(null);

  // Function to fetch weather data
  const fetchWeather = async (lat, lon) => {
    const API_KEY = 'YOUR_API_KEY'; // Replace with your API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Weather Data:', data);
      setWeather(data);
      onWeatherSelect(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Component to handle user clicks on the map
  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker({ lat, lng });
        fetchWeather(lat, lng);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[20, 78]} zoom={5} className="h-[400px] w-full rounded-lg shadow-md">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <ClickHandler />
      {marker && (
        <Marker position={position}>
          <ForecastPopup
            cityName="Junagadh"
            weatherDetails={{
              temp: 34.5,
              wind: 4.2,
              humidity: 14,
              condition: 'clear sky'
            }}
            forecastData={[
              { date: '03-16', temp: 34.1, wind: 5.5, humidity: 12, condition: 'clear sky', icon: '☀️' },
              { date: '03-17', temp: 22.2, wind: 3.7, humidity: 53, condition: 'clear sky', icon: '🌑' },
              { date: '03-18', temp: 23.5, wind: 3.4, humidity: 55, condition: 'clouds', icon: '☁️' },
            ]}
          />
        </Marker>

      )}
    </MapContainer>
  );
};

export default WeatherMap;
