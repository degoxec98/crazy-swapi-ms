import { Weather } from "../domains/Weather";

export interface WeatherRepository {
  getWeatherByFilter(latitude: number, longitude: number): Promise<Weather>;
}