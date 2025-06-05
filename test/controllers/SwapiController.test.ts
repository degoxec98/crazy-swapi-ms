import * as lambda from "aws-lambda";
import { SwapiService } from "../../src/services/SwapiService";
import {
 SwapiController,
 SwapiControllerProps,
} from "../../src/controllers/SwapiController";

describe("SwapiController", () => {
  describe("findFusion", () => {
    it("should return a fusion", async () => {
      // Prepare
      const serviceMock = {
        findFusion: jest.fn(() => 
          Promise.resolve({
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
      } as unknown as SwapiService;

      const controller = new SwapiController({
        service: serviceMock,
      } as unknown as SwapiControllerProps);

      // Execute
      const response = await controller.findFusion({
        httpMethod: "GET",
      } as unknown as lambda.APIGatewayEvent);

      // Validate
      expect(response).toEqual(
        expect.objectContaining({
          statusCode: 200,
          body: JSON.stringify({
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
        }),
      );

      expect(serviceMock.findFusion).toHaveBeenCalled();
    });
  });

  describe("findHistory", () => {
    it("should return history fusion", async () => {
      // Prepare
      const serviceMock = {
        findHistory: jest.fn(() => 
          Promise.resolve({
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
          }),
        ),
      } as unknown as SwapiService;

      const controller = new SwapiController({
        service: serviceMock,
      } as unknown as SwapiControllerProps);

      // Execute
      const response = await controller.findHistory({
        httpMethod: "GET",
      } as unknown as lambda.APIGatewayEvent);

      // Validate
      expect(response).toEqual(
        expect.objectContaining({
          statusCode: 200,
          body: JSON.stringify({
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
          }),
        }),
      );

      expect(serviceMock.findHistory).toHaveBeenCalled();
    });
  });

  describe("createFusion", () => {
    it("should create a custom fusion", async () => {
      // Prepare
      const serviceMock = {
        createFusion: jest.fn(() => 
          Promise.resolve({
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
      } as unknown as SwapiService;

      const controller = new SwapiController({
        service: serviceMock,
      } as unknown as SwapiControllerProps);

      // Execute
      const response = await controller.createStore({
        httpMethod: "POST",
        body: JSON.stringify({
          custom: {
            name: "Custom Fusion",
            species: "Human",
            gender: "gender",
            age: 30,
            description: "A custom fusion of a character and a planet",
          },
        }),
      } as unknown as lambda.APIGatewayEvent);

      // Validate
      expect(response).toEqual(
        expect.objectContaining({
          statusCode: 200,
          body: JSON.stringify({
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
        }),
      );

      expect(serviceMock.createFusion).toHaveBeenCalledWith({
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