import {
  WeatherRepositoryImpl,
  WeatherRepositoryProps,
} from "../../src/repositories/WeatherRepositoryImpl";

describe("WeatherRepositoryImpl", () => {
  describe("getWeatherByFilter", () => {
    it("should return weather by filter", async () => {
      // Prepare
      const httpClientMock = {
        get: jest.fn(() => 
          Promise.resolve({
            data: {
              latitude: 34.0522,
              longitude: -118.2437,
              elevation: 89,
              current_weather: {
                time: "2023-10-01T12:00:00Z",
                temperature: 25,
                windspeed: 5,
                winddirection: 0,
              },
              current_weather_units: {
                temperature: "°C",
                windspeed: "km/h",
                winddirection: "°",
              },
            },
          }),
        ),
      };

      const weatherRepository = new WeatherRepositoryImpl({
        httpClient: httpClientMock,
        config: {
          baseUrl: "baseUrl",
        },
      } as unknown as WeatherRepositoryProps);

      // Execute
      const response = await weatherRepository.getWeatherByFilter(34.0522, -118.2437);

      // Validate
      expect(response).toEqual({
        latitude: 34.0522,
        longitude: -118.2437,
        elevation: 89,
        time: "2023-10-01T12:00:00Z",
        temperature: "25°C",
        windspeed: "5km/h",
        winddirection: "0°",
      });

      expect(httpClientMock.get).toHaveBeenCalledWith(
        "baseUrl/forecast",
        {
          params: {
            latitude: 34.0522,
            longitude: -118.2437,
            current_weather: true,
          },
        },
      );
    });
  });
});