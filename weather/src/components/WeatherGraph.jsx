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
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your API key

const WeatherGraph = () => {
    const [city, setCity] = useState("New York");
    const [weatherData, setWeatherData] = useState([]);
    const [selectedRange, setSelectedRange] = useState("7");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchWeatherData();
    }, [selectedRange]);

    const fetchWeatherData = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            console.log("API Response:", data);

            if (data.cod !== "200") {
                setError("City not found. Please try again.");
                setWeatherData([]);
                return;
            }

            const filteredData = data.list.slice(0, parseInt(selectedRange)).map((entry) => ({
                time: new Date(entry.dt * 1000).toLocaleDateString(),
                temp: entry.main.temp,
                humidity: entry.main.humidity,
                wind: entry.wind.speed,
                precipitation: entry.pop * 100,
            }));

            setWeatherData(filteredData);
            setError("");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch weather data.");
        }
        setLoading(false);

    };

    const graphOptions = [
        { label: "Past 7 Days", value: "7" },
        { label: "Past 14 Days", value: "14" },
        { label: "Past 1 Month", value: "30" },
        { label: "Past 1 Year", value: "365" },
    ];

    const generateChartData = (dataKey, label, borderColor, backgroundColor) => ({
        labels: weatherData.map((data) => data.time),
        datasets: [
            {
                label,
                data: weatherData.map((data) => data[dataKey]),
                borderColor,
                backgroundColor,
                tension: 0.3,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: borderColor,
            },
        ],
    });

    return (
        <div className="min-h-screen w-full  bg-gradient-to-b text-white p-6 from-blue-20 to-blue-400 ">
            <h1 className="text-3xl font-bold text-center mb-4">Advanced Weather Tracker</h1>
            <div className="flex justify-center gap-4 mb-6">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchWeatherData()}
                    className="p-2 rounded-md text-white border-2 border-blue-300"
                    placeholder="Enter city..."
                />
                <button
                    onClick={fetchWeatherData}
                    disabled={loading}
                    className={`flex items-center px-4 py-2 rounded-md transition text-white 
    ${loading ? "bg-indigo-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                    {loading ? (
                        <>
                            <svg className="mr-2 size-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            Getting…
                        </>
                    ) : (
                        "Get Weather"
                    )}
                </button>



            </div>
            <div className="flex justify-center gap-4 mb-6">
                {graphOptions.map((option) => (
                    <button
                        key={option.value}
                        className={`px-4 py-2 rounded-md ${selectedRange === option.value ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-500 transition`}
                        onClick={() => setSelectedRange(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            {error && <p className="text-red-400 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl text-center text-black font-bold mb-2">Temperature</h2>
                    <Line data={generateChartData("temp", "Temperature (°C)", "#FF5733", "rgba(255, 87, 51, 0.2)")} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl text-center text-black font-bold mb-2">Humidity</h2>
                    <Line data={generateChartData("humidity", "Humidity (%)", "#33C4FF", "rgba(51, 196, 255, 0.2)")} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl text-center text-black font-bold mb-2">Wind Speed</h2>
                    <Line data={generateChartData("wind", "Wind Speed (m/s)", "#28A745", "rgba(40, 167, 69, 0.2)")} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl text-center text-black font-bold mb-2">Precipitation</h2>
                    <Line data={generateChartData("precipitation", "Precipitation (%)", "#FFC107", "rgba(255, 193, 7, 0.2)")} />
                </div>
            </div>
        </div>
    );
};

export default WeatherGraph;
