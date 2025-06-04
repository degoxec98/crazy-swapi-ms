import axios from "axios";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoRepositoryImpl } from "./DynamoRepositoryImpl";
import { SwapiRepositoryImpl } from "./SwapiRepositoryImpl";
import { WeatherRepositoryImpl } from "./WeatherRepositoryImpl";

export const dynamoDbRepo = new DynamoRepositoryImpl({
  dynamoDbClient: DynamoDBDocumentClient.from(new DynamoDBClient({}), {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  }),
  config: {
    fusionTable: process.env.FUSION_TABLE!,
  },
})

export const swapiRepo = new SwapiRepositoryImpl({
  httpClient: axios,
  config: {
    baseUrl: process.env.SWAPI_BASE_URL!,
  }
});

export const weatherRepo = new WeatherRepositoryImpl({
  httpClient: axios,
  config: {
    baseUrl: process.env.WEATHER_BASE_URL!,
  }
});