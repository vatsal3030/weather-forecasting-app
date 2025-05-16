import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherApp = () => {
  const [city, setCity] = useState("Ahmedabad");
  const [weather, setWeather] = useState(null);
  const [pastData, setPastData] = useState([]);
  const [timeframe, setTimeframe] = useState(7); // Default: 7 days
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your API key

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    if (weather) {
      fetchPastWeather(weather.coord.lat, weather.coord.lon);
    }
  }, [timeframe]);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);

    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found. Please try again.");
        setWeather(null);
        return;
      }

      setWeather(data);
      await fetchPastWeather(data.coord.lat, data.coord.lon);

    } catch (error) {
      setError("Failed to fetch weather. Please try again later.");
      setWeather(null);
    }
    setLoading(false);

  };

  const fetchPastWeather = async (lat, lon) => {
    try {
      const today = new Date();
      const pastDays = [...Array(timeframe)].map((_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i - 1);
        return date.toISOString().split("T")[0];
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=auto&past_days=${timeframe}`
      );
      const pastWeather = await response.json();

      if (pastWeather.daily && pastWeather.daily.temperature_2m_max) {
        setPastData(
          pastDays.map((date, index) => ({
            date,
            temp: pastWeather.daily.temperature_2m_max[index] || 0,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching past weather:", error);
    }
  };

  const chartData = {
    labels: pastData.map((day) => day.date),
    datasets: [
      {
        label: "Temperature (°C)",
        data: pastData.map((day) => day.temp),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        titleFont: { weight: "bold", size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return ` Temp: ${context.raw}°C`;
          },
          title: function (context) {
            return `Date: ${context[0].label}`;
          }
        }
      }
    },
    hover: {
      mode: "nearest",
      intersect: true
    }
  };

  return (
    <div className="overflow-x-hidden relative w-screen flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center h-full bg-gradient-to-b text-white p-4 from-blue-20 to-blue-400  ">
        <h1 className="text-white text-3xl font-bold mb-6">Advanced Weather Tracker</h1>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
            className="p-2 rounded-md text-white border-2 border-blue-300"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className={`flex items-center px-4 py-2 rounded-md transition text-white 
    ${loading ? "bg-indigo-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 size-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing…
              </>
            ) : (
              "Get Weather"
            )}
          </button>

        </div>

        {error && <p className="mt-4 text-red-300">{error}</p>}

        {weather && (
          <div className="mt-6 p-6 bg-white text-black rounded-lg shadow-lg text-center w-[400px]">
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg">{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="mx-auto"
            />
            <p className="text-4xl font-bold">{weather.main.temp}°C</p>
            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}

        {pastData.length > 0 && (
          <div className="mt-8 w-full max-w-2xl p-6 bg-white text-black rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Past Temperature Data</h2>
              <select
                className="p-2 border rounded-md text-black"
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value))}
              >
                <option value={7}>Last 7 Days</option>
                <option value={14}>Last 14 Days</option>
                <option value={30}>Last 30 Days</option>
                <option value={365}>Last 1 Year</option>
              </select>
            </div>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
