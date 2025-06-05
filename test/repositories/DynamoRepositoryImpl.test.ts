import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
 DynamoRepositoryImpl,
 DynamoRepositoryProps,
} from "../../src/repositories/DynamoRepositoryImpl";
import { Fusion } from "../../src/domains/Fusion";

class DynamoRepositoryImplStub extends DynamoRepositoryImpl {
  protected getUUID(): any {
    return "randomId";
  }

  protected getTimestamp() {
    return 1234567890;
  }
}

describe("DynamoRepositoryImpl", () => {
  describe("createFusion", () => {
    it("should create a fusion", async () => {
      // Prepare
      const dynamoDbClientMock = {
        send: jest.fn(() => Promise.resolve()),
      } as unknown as DynamoDBClient;

      const dynamoRepository = new DynamoRepositoryImplStub({
        dynamoDbClient: dynamoDbClientMock,
        config: {
          fusionTable: "fusionTable",
          fusionPageSize: 10,
        },
      } as unknown as DynamoRepositoryProps);

      // Execute
      const response = await dynamoRepository.createFusion(
        new Fusion({
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
        }),
      );

      // Validate
      expect(response).toEqual(
        expect.objectContaining({
          id: "randomId",
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
          partition: "FUSION",
          creationDate: 1234567890,
          lastUpdateDate: 1234567890,
        }),
      );

      expect(dynamoDbClientMock.send).toHaveBeenCalledWith(
        expect.objectContaining({
          input: expect.objectContaining({
            TableName: "fusionTable",
            Item: expect.objectContaining({
              id: "randomId",
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
              partition: "FUSION",
              creationDate: 1234567890,
              lastUpdateDate: 1234567890,
            }),
          }),
        }),
      );
    });
  });

  describe("findFusionsByFilter", () => {
    it("should create fusions by filter", async () => {
      // Prepare
      const dynamoDbClientMock = {
        send: jest.fn(() => Promise.resolve({
          LastEvaluatedKey: {
            id: "fusionId",
            partition: "FUSION",
            creationDate: 1234567890,
          },
          Items: [
            {
              id: "fusionId",
              partition: "FUSION",
              creationDate: 1234567890,
              lastUpdateDate: 1234567890,
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
            },
          ],
        })),
      } as unknown as DynamoDBClient;

      const dynamoRepository = new DynamoRepositoryImplStub({
        dynamoDbClient: dynamoDbClientMock,
        config: {
          fusionTable: "fusionTable",
          fusionPageSize: 2,
        },
      } as unknown as DynamoRepositoryProps);

      // Execute
      const response = await dynamoRepository.findFusionsByFilter();

      // Validate
      expect(response).toEqual(
        expect.objectContaining({
          nextToken: "eyJpZCI6ImZ1c2lvbklkIiwicGFydGl0aW9uIjoiRlVTSU9OIiwiY3JlYXRpb25EYXRlIjoxMjM0NTY3ODkwfQ==",
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
              creationDate: 1234567890,
              lastUpdateDate: 1234567890,
            },
          ],
        }),
      );

      expect(dynamoDbClientMock.send).toHaveBeenCalledWith(
        expect.objectContaining({
          input: expect.objectContaining({
            TableName: "fusionTable",
            IndexName: "creationDateIndex",
            KeyConditionExpression: "#p = :p",
            ExpressionAttributeNames: {
              "#p": "partition",
            },
            ExpressionAttributeValues: {
              ":p": "FUSION",
            },
            ScanIndexForward: false,
            ExclusiveStartKey: undefined,
            Limit: 2,
          }),
        }),
      );
    });
  });
});