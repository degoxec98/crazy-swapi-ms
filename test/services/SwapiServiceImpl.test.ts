import { Fusion } from "../../src/domains/Fusion";
import { FusionFilter } from "../../src/domains/FusionFilter";
import { DynamoRepository } from "../../src/repositories/DynamoRepository";
import { SwapiRepository } from "../../src/repositories/SwapiRepository";
import { WeatherRepository } from "../../src/repositories/WeatherRepository";
import {
 SwapiServiceImpl,
 SwapiServiceProps,
} from "../../src/services/SwapiServiceImpl";

class SwapiServiceImplStub extends SwapiServiceImpl {
  protected getRandomCharacterCode() {
    return "code";
  }

  protected getRandomLatitude() {
    return 10.5;
  }

  protected getRandomLongitude() {
    return -10.5;
  }
}

describe("SwapiServiceImpl", () => {
  describe("findFusion", () => {
    it("should return a fusion", async () => {
      // Prepare
      const dynamoRepoRock = {
        createFusion: jest.fn(() =>
          Promise.resolve(
           new Fusion({
             id: "fusionId",
             character: {
               code: "code",
               name: "Luke Skywalker",
               height: "172",
               mass: "77",
               gender: "Male",
               homeworld: "homeworldUrl",
             },
             planet: {
               url: "homeworldUrl",
               name: "Tatooine",
               population: "200000",
               diameter: "10465",
               gravity: "1 standard",
               terrain: "desert",
             },
             weather: {
               latitude: 34.0522,
               longitude: -118.2437,
               elevation: 89,
               time: "2023-10-01T12:00:00Z",
               temperature: "25°C",
               windspeed: "5 km/h",
               winddirection: "N",
             },
             creationDate: 1,
             lastUpdateDate: 1,
           }),
          ),
        ),
      } as unknown as DynamoRepository;

      const swapiRepoMock = {
        findCharacterByCode: jest.fn(() =>
          Promise.resolve({
            code: "code",
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            gender: "Male",
            homeworld: "homeworldUrl",
          }),
        ),
        findPlanetByUrl: jest.fn(() =>
          Promise.resolve({
            url: "homeworldUrl",
            name: "Tatooine",
            population: "200000",
            diameter: "10465",
            gravity: "1 standard",
            terrain: "desert",
          }),
        ),
      } as unknown as SwapiRepository;

      const weatherRepoMock = {
        getWeatherByFilter: jest.fn(() =>
          Promise.resolve({
            latitude: 34.0522,
            longitude: -118.2437,
            elevation: 89,
            time: "2023-10-01T12:00:00Z",
            temperature: "25°C",
            windspeed: "5 km/h",
            winddirection: "N",
          }),
        ),
      } as unknown as WeatherRepository;

      const service = new SwapiServiceImplStub({
        dynamoDbRepo: dynamoRepoRock,
        swapiRepo: swapiRepoMock,
        weatherRepo: weatherRepoMock,
        config: {},
      } as unknown as SwapiServiceProps);

      // Execute
      const response = await service.findFusion();

      // Validate
      expect(response).toEqual({
        id: "fusionId",
        character: {
          code: "code",
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
          gender: "Male",
          homeworld: "homeworldUrl",
        },
        planet: {
          url: "homeworldUrl",
          name: "Tatooine",
          population: "200000",
          diameter: "10465",
          gravity: "1 standard",
          terrain: "desert",
        },
        weather: {
          latitude: 34.0522,
          longitude: -118.2437,
          elevation: 89,
          time: "2023-10-01T12:00:00Z",
          temperature: "25°C",
          windspeed: "5 km/h",
          winddirection: "N",
        },
        creationDate: 1,
        lastUpdateDate: 1,
      });

      expect(swapiRepoMock.findCharacterByCode).toHaveBeenCalledWith("code");

      expect(swapiRepoMock.findPlanetByUrl).toHaveBeenCalledWith("homeworldUrl");

      expect(weatherRepoMock.getWeatherByFilter).toHaveBeenCalledWith(10.5, -10.5);

      expect(dynamoRepoRock.createFusion).toHaveBeenCalledWith({
        character: {
          code: "code",
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
          gender: "Male",
          homeworld: "homeworldUrl",
        },
        planet: {
          url: "homeworldUrl",
          name: "Tatooine",
          population: "200000",
          diameter: "10465",
          gravity: "1 standard",
          terrain: "desert",
        },
        weather: {
          latitude: 34.0522,
          longitude: -118.2437,
          elevation: 89,
          time: "2023-10-01T12:00:00Z",
          temperature: "25°C",
          windspeed: "5 km/h",
          winddirection: "N",
        },
      });
    });
  });

  describe("findHistory", () => {
    it("should return a fusion", async () => {
      // Prepare
      const dynamoRepoRock = {
        createFusion: jest.fn(() => Promise.resolve()),
        findFusionsByFilter: jest.fn(() =>
          Promise.resolve(
           new FusionFilter({
            nextToken: "nextToken",
            items: [
              new Fusion({
                id: "fusionId",
                character: {
                  code: "code",
                  name: "Luke Skywalker",
                  height: "172",
                  mass: "77",
                  gender: "Male",
                  homeworld: "homeworldUrl",
                },
                planet: {
                  url: "homeworldUrl",
                  name: "Tatooine",
                  population: "200000",
                  diameter: "10465",
                  gravity: "1 standard",
                  terrain: "desert",
                },
                weather: {
                  latitude: 34.0522,
                  longitude: -118.2437,
                  elevation: 89,
                  time: "2023-10-01T12:00:00Z",
                  temperature: "25°C",
                  windspeed: "5 km/h",
                  winddirection: "N",
                },
                creationDate: 1,
                lastUpdateDate: 1,
              }),
            ],
           }),
          ),
        ),
      } as unknown as DynamoRepository;

      const swapiRepoMock = {
        findCharacterByCode: jest.fn(() => Promise.resolve()),
        findPlanetByUrl: jest.fn(() => Promise.resolve()),
      } as unknown as SwapiRepository;

      const weatherRepoMock = {
        getWeatherByFilter: jest.fn(() => Promise.resolve()),
      } as unknown as WeatherRepository;

      const service = new SwapiServiceImplStub({
        dynamoDbRepo: dynamoRepoRock,
        swapiRepo: swapiRepoMock,
        weatherRepo: weatherRepoMock,
        config: {},
      } as unknown as SwapiServiceProps);

      // Execute
      const response = await service.findHistory();

      // Validate
      expect(response).toEqual({
        nextToken: "nextToken",
        items: [
          {
            id: "fusionId",
            character: {
              code: "code",
              name: "Luke Skywalker",
              height: "172",
              mass: "77",
              gender: "Male",
              homeworld: "homeworldUrl",
            },
            planet: {
              url: "homeworldUrl",
              name: "Tatooine",
              population: "200000",
              diameter: "10465",
              gravity: "1 standard",
              terrain: "desert",
            },
            weather: {
              latitude: 34.0522,
              longitude: -118.2437,
              elevation: 89,
              time: "2023-10-01T12:00:00Z",
              temperature: "25°C",
              windspeed: "5 km/h",
              winddirection: "N",
            },
            creationDate: 1,
            lastUpdateDate: 1,
          },
        ],
      });

      expect(swapiRepoMock.findCharacterByCode).not.toHaveBeenCalled();
      expect(swapiRepoMock.findPlanetByUrl).not.toHaveBeenCalled();
      expect(weatherRepoMock.getWeatherByFilter).not.toHaveBeenCalled();

      expect(dynamoRepoRock.findFusionsByFilter).toHaveBeenCalledWith(undefined);
    });
  });


  describe("findFusion", () => {
    it("should return a fusion", async () => {
      // Prepare
      const dynamoRepoRock = {
        createFusion: jest.fn(() =>
          Promise.resolve(
           new Fusion({
            id: "fusionId",
            custom: {
              name: "Custom Fusion",
              species: "Human",
              gender: "gender",
              age: 30,
              description: "A custom fusion of a character and a planet",
            },
            creationDate: 1,
            lastUpdateDate: 1,
           }),
          ),
        ),
      } as unknown as DynamoRepository;

      const swapiRepoMock = {
        findCharacterByCode: jest.fn(() => Promise.resolve()),
        findPlanetByUrl: jest.fn(() => Promise.resolve()),
      } as unknown as SwapiRepository;

      const weatherRepoMock = {
        getWeatherByFilter: jest.fn(() => Promise.resolve()),
      } as unknown as WeatherRepository;

      const service = new SwapiServiceImplStub({
        dynamoDbRepo: dynamoRepoRock,
        swapiRepo: swapiRepoMock,
        weatherRepo: weatherRepoMock,
        config: {},
      } as unknown as SwapiServiceProps);

      // Execute
      const response = await service.createFusion(
        new Fusion({
          custom: {
            name: "Custom Fusion",
            species: "Human",
            gender: "gender",
            age: 30,
            description: "A custom fusion of a character and a planet",
          },
        }),
      );

      // Validate
      expect(response).toEqual({
        id: "fusionId",
        custom: {
          name: "Custom Fusion",
          species: "Human",
          gender: "gender",
          age: 30,
          description: "A custom fusion of a character and a planet",
        },
        creationDate: 1,
        lastUpdateDate: 1,
      });

      expect(swapiRepoMock.findCharacterByCode).not.toHaveBeenCalled();
      expect(swapiRepoMock.findPlanetByUrl).not.toHaveBeenCalled();
      expect(weatherRepoMock.getWeatherByFilter).not.toHaveBeenCalled();

      expect(dynamoRepoRock.createFusion).toHaveBeenCalledWith({
        custom: {
          name: "Custom Fusion",
          species: "Human",
          gender: "gender",
          age: 30,
          description: "A custom fusion of a character and a planet",
        },
      });
    });
  });
});