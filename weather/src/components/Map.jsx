import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [35, 50],
    iconAnchor: [17, 50],
});

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your API key

const Map = () => {
    const [marker, setMarker] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if (marker) {
            fetchWeather(marker.lat, marker.lng);
        } else if (userLocation) {
            fetchWeather(userLocation.lat, userLocation.lng);
        }
    }, [marker, userLocation]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, []);

    const fetchWeather = async (lat, lon) => {
        setLoading(true);
        try {
            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );

            const weatherData = await weatherRes.json();
            const forecastData = await forecastRes.json();

            if (weatherRes.ok && forecastRes.ok) {
                setWeather(weatherData);
                processForecast(forecastData);
            } else {
                console.error("Error:", weatherData.message || forecastData.message);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    const processForecast = (data) => {
        const currentTime = new Date();
        const futureForecast = [];
        const dates = new Set();

        for (const item of data.list) {
            const forecastTime = new Date(item.dt * 1000);
            const date = forecastTime.toISOString().split("T")[0];

            if (!dates.has(date) && forecastTime > currentTime && futureForecast.length < 3) {
                dates.add(date);
                futureForecast.push({
                    date,
                    temp: item.main.temp,
                    wind: item.wind.speed,
                    humidity: item.main.humidity,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description,
                });
            }
        }
        setForecast(futureForecast);
    };

    const ClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setMarker({ lat, lng });
                setWeather(null);
                setForecast([]);
            },
        });
        return null;
    };

    return (
        <div className="h-screen w-screen">
            <h1 className="text-white text-center p-4 text-2xl font-bold bg-black">
                🌍 Weather Tracker
            </h1>

            <MapContainer
                center={userLocation ? [userLocation.lat, userLocation.lng] : [20, 78]}
                zoom={5}
                className="h-[85vh] w-full"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickHandler />

                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon}>
                        <Popup autoOpen>{loading ? <p>Loading weather...</p> : <WeatherPopup weather={weather} forecast={forecast} />}</Popup>
                    </Marker>
                )}

                {marker && (
                    <Marker position={[marker.lat, marker.lng]} icon={customIcon}>
                        <Popup autoOpen>{loading ? <p>Loading weather...</p> : <WeatherPopup weather={weather} forecast={forecast} />}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

// Styled Weather Popup with Row Layout for 3-Day Forecast
const WeatherPopup = ({ weather, forecast }) => {
    return weather && weather.main ? (
        <div className="text-center text-sm h-auto w-[300px] p-4 rounded-xl shadow-lg">
            <h3 className="font-bold text-lg text-gray-900">{weather.name || "Selected Location"}</h3>
            <div className="mt-2">
                <p className="text-gray-700">🌡 Temp: {weather.main.temp}°C</p>
                <p className="text-gray-700">💨 Wind: {weather.wind.speed} m/s</p>
                <p className="text-gray-700">💧 Humidity: {weather.main.humidity}%</p>
                <p className="text-gray-700">⛅ {weather.weather[0].description}</p>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-gray-800">3-Day Future Forecast</h3>
            <div className="flex justify-between space-x-2 mt-2">
                {forecast.map((day, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-2 shadow-md text-gray-900 text-center w-[110px]">
                        <p className="font-semibold text-xs">{day.date}</p>
                        <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="Weather icon" className="w-[30px] h-[30px] mx-auto" />
                        <p className="text-gray-800 font-bold text-sm">🌡 {day.temp}°C</p>
                        <p className="text-gray-600 text-xs">💨 {day.wind} m/s</p>
                        <p className="text-gray-600 text-xs">💧 {day.humidity}%</p>
                        <p className="text-gray-700 text-xs">{day.description}</p>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p>Weather data unavailable</p>
    );
};


export default Map;
