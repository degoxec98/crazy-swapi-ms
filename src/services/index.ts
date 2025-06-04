import { SwapiServiceImpl } from "./SwapiServiceImpl";
import { dynamoDbRepo, swapiRepo, weatherRepo } from "../repositories";

export const service = new SwapiServiceImpl({
  dynamoDbRepo,
  swapiRepo,
  weatherRepo,
  config: {},
})