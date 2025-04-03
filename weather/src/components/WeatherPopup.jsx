import React from 'react';
import { Popup } from 'react-leaflet';

const ForecastPopup = ({ forecastData, cityName, weatherDetails }) => {
  return (
    <Popup closeButton={false} className="custom-popup">
      <div className="w-[350px] max-h-[400px] overflow-hidden bg-white rounded-2xl shadow-xl p-4 text-center space-y-4">
        <h2 className="text-lg font-bold text-gray-800">{cityName}</h2>

        {/* Current Weather */}
        <div className="flex justify-around text-sm text-gray-600">
          <div>🌡️ Temp: {weatherDetails.temp}°C</div>
          <div>💨 {weatherDetails.wind} m/s</div>
          <div>💧 {weatherDetails.humidity}%</div>
        </div>
        <div className="text-sm capitalize text-gray-700">{weatherDetails.condition}</div>

        {/* 3-Day Forecast */}
        <div className="flex justify-between gap-2">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-2 w-[90px] space-y-2 flex flex-col items-center"
            >
              <p className="text-xs font-semibold">{day.date}</p>
              <div className="text-2xl">{day.icon}</div>
              <p className="font-bold">{day.temp}°C</p>
              <div className="flex flex-col text-xs text-gray-500">
                <span>💨 {day.wind} m/s</span>
                <span>💧 {day.humidity}%</span>
                <span>{day.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default ForecastPopup;
