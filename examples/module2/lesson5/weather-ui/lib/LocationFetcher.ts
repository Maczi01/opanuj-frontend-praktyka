import axios from 'axios';
import { LocationWeather } from '../models/LocationWeather';
import { parseLocation } from './LocationParser';
import { WeatherRequest } from '../models/WeatherRequest';

function convertDate(dateString: string): string {
  return `${dateString.substring(3, 5)}-${dateString.substring(0, 2)}-${dateString.substring(6)}`;
}

async function getWeatherData(
  request: WeatherRequest
): Promise<LocationWeather> {
  const { data } = await axios.get<LocationWeather>(
    `/api/weather?city=${request.city}&country=${request.country}`
  );
  if (request.country === 'US' && 'Weather' in data.weatherDetails) {
    return {
      city: data.city,
      country: data.country,
      weatherDetails: data.weatherDetails.Weather.map((detail: any) => {
        return ({
          date: convertDate(detail.date),
          type: detail.type,
          averageTemperature: detail.average_temperature
        });
      })
    };
  }
  return data;
}

export async function fetchWeather(
  locationQuery: string
): Promise<LocationWeather | null> {
  const request = parseLocation(locationQuery);

  if (!request) {
    return null;
  }

  try {
    return await getWeatherData({
      city: request.city,
      country: request.country,
    });
  } catch {
    throw new Error(
      `Cannot fetch weather data for provided location: ${request.city}, ${request.country}`
    );
  }
}
