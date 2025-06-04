import axios from "axios";
import { WeatherRepository } from "./WeatherRepository";
import { Weather } from "../domains/Weather";

export interface WeatherRepositoryProps {
  httpClient: typeof axios;
  config: {
    baseUrl: string;
  };
}

export class WeatherRepositoryImpl implements WeatherRepository {
  constructor(private props: WeatherRepositoryProps) {}

  async getWeatherByFilter(latitude: number, longitude: number): Promise<Weather> {
    try {
      const response = await this.props.httpClient.get(
        `${this.props.config.baseUrl}/forecast`,
        {
          params: {
            latitude,
            longitude,
            current_weather: true,
          },
        },
      );
      console.log("Response data:", response.data);
      return this.unmarshalWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather by filter:", error);
      throw new Error("Failed to fetch weather data");
    }
  }

  private unmarshalWeather(weather: any): Weather {
    return {
      latitude: weather.latitude,
      longitude: weather.longitude,
      elevation: weather.elevation,
      time: weather.current_weather.time,
      temperature: `${weather.current_weather.temperature}${weather.current_weather_units.temperature}`,
      windspeed: `${weather.current_weather.windspeed}${weather.current_weather_units.windspeed}`,
      winddirection: `${weather.current_weather.winddirection}${weather.current_weather_units.winddirection}`,
    }
  }
}