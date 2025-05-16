
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'weather-icons-react';
import devlopeImg from '../components/images/devlope.png'

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your API key

  // Fetch weather data by coordinates
  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError("Weather data not available");
        setWeatherData(null);
        return;
      }

      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch weather. Please try again later.");
      setWeatherData(null);
      setLoading(false);
    }
  };

  // Fetch user location and weather data
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError("Please enable location access to get local weather");
          setLoading(false);
          // Default to a major city if location access is denied
          fetchWeatherData(51.5074, -0.1278); // London coordinates
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny size={64} className="text-yellow-400" />;
      case 'Rain':
        return <WiRain size={64} className="text-blue-400" />;
      case 'Clouds':
        return <WiCloudy size={64} className="text-gray-400" />;
      case 'Snow':
        return <WiSnow size={64} className="text-blue-200" />;
      case 'Thunderstorm':
        return <WiThunderstorm size={64} className="text-purple-500" />;
      case 'Fog':
      case 'Mist':
      case 'Haze':
        return <WiFog size={64} className="text-gray-300" />;
      default:
        return <WiDaySunny size={64} className="text-yellow-400" />;
    }
  };

  // Sample weather news
  const weatherNews = [
    {
      id: 1,
      title: "Heatwave Alert: Temperatures to soar across Europe next week",
      summary: "Meteorologists predict record-breaking temperatures in several European countries.",
      date: "June 15, 2023"
    },
    {
      id: 2,
      title: "Hurricane season 2023 predicted to be more active than average",
      summary: "Experts forecast 14-20 named storms this season with 6-10 becoming hurricanes.",
      date: "June 10, 2023"
    },
    {
      id: 3,
      title: "New climate study reveals faster than expected polar ice melt",
      summary: "Research shows Arctic warming is occurring at twice the global average rate.",
      date: "June 5, 2023"
    }
  ];

  return (
    <div className="h-full min-h-screen bg-gradient-to-b from-blue-20 to-blue-400 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">WeatherApp</h1>
          <p className="text-lg text-blue-300 font-bold">Your comprehensive weather companion</p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weather Card - Left Column */}
          <div className="lg:col-span-2 space-y-8 ">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-[1.04] transition-all duration-500 ease-in-out">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Current Weather</h2>

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-8">{error}</div>
              ) : weatherData ? (
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-4">
                      {getWeatherIcon(weatherData.weather[0].main)}
                    </div>
                    <div>
                      <p className="text-5xl font-bold text-gray-800">{Math.round(weatherData.main.temp)}°C</p>
                      <p className="text-gray-600 capitalize">{weatherData.weather[0].description}</p>
                      <p className="text-gray-700">{weatherData.name}</p>
                    </div>
                  </div>

                  <div className="font-bold text-blue-900 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-300 p-3 rounded-lg">
                      <p className="text-sm text-blue-900">Humidity</p>
                      <p className="text-xl font-semibold">{weatherData.main.humidity}%</p>
                    </div>
                    <div className="bg-blue-300 p-3 rounded-lg">
                      <p className="text-sm text-blue-900">Wind</p>
                      <p className="text-xl font-semibold">{weatherData.wind.speed} m/s</p>
                    </div>
                    <div className="bg-blue-300 p-3 rounded-lg">
                      <p className="text-sm text-blue-900">High</p>
                      <p className="text-xl font-semibold">{Math.round(weatherData.main.temp_max)}°C</p>
                    </div>
                    <div className="bg-blue-300 p-3 rounded-lg">
                      <p className="text-sm text-blue-900">Low</p>
                      <p className="text-xl font-semibold">{Math.round(weatherData.main.temp_min)}°C</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Website Description */}
            <div className="bg-white rounded-xl font-bold shadow-lg p-6 hover:scale-[1.04] transition-all duration-500 ease-in-out ">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">About WeatherApp</h2>
              <p className="text-gray-700 mb-4">
                WeatherApp provides comprehensive weather information to help you plan your day, week, or even analyze long-term trends.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Home</h3>
                  <p className="text-sm text-gray-600">Get current weather for your location at a glance with detailed metrics.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Search</h3>
                  <p className="text-sm text-gray-600">Look up weather for any location worldwide with our powerful search.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Graphs</h3>
                  <p className="text-sm text-gray-600">Visualize temperature, precipitation, and other metrics over time.</p>
                </div>
                <div className="md:col-span-3 bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Map</h3>
                  <p className="text-sm text-gray-600">Get Real time weather data across the world.</p>
                </div>
                <div className="md:col-span-3 bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Top News</h3>
                  <p className="text-sm text-gray-600">Stay informed with the latest weather-related news and climate updates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather News - Right Column */}
          <div className="space-y-6 ">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-[1.04] transition-all duration-500 ease-in-out">
              <h2 className="font-extrabold text-2xl  text-blue-800 mb-4">Weather News</h2>

              <div className="space-y-4">
                {weatherNews.map(news => (
                  <div key={news.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-blue-700">{news.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{news.summary}</p>
                    <p className="text-xs text-gray-400 mt-2">{news.date}</p>
                  </div>
                ))}
              </div>

              <a href='/news' className="self-center mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All News →
              </a>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-[1.04] transition-all duration-500 ease-in-out">
              <h2 className="text-2xl font-extrabold text-blue-800 mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/search" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">🔍</span> Search Weather
                  </a>
                </li>
                <li>
                  <a href="/graph" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">📊</span> Weather Graphs
                  </a>
                </li>
                <li>
                  <a href="/map" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">🗺️</span>Explore World Map
                  </a>
                </li>
                <li>
                  <a href="/news" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">📰</span> Top Weather News
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-white mt-12 text-center font-extrabold  text-black text-[20px] rounded-xl shadow-lg p-6 hover:scale-[1.04] transition-all duration-500 ease-in-out">
          <p>© 2023 WeatherApp. All rights reserved.</p>
          <div className='flex flex-row w-full justify-center items-center space-x-2 '>
            <img src={devlopeImg} alt="devlope" className="w-5 h-5" />
            <p className="mt-1 text-blue-400">Devlope By Vatsal Vadgama</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;