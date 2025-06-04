import Joi from "joi";
import { SwapiCharacter } from "./SwapiCharacter";
import { SwapiPlanet } from "./SwapiPlanet";
import { Weather } from "./Weather";

const fusionCreateSchema = Joi.object({
  custom: Joi.object({
    name: Joi.string().required(),
    species: Joi.string(),
    gender: Joi.string(),
    age: Joi.number().integer().min(0),
    description: Joi.string(),
  }),
});

export class Fusion {
  id: string;

  character: SwapiCharacter;

  planet: SwapiPlanet;

  weather: Weather;

  custom: Partial<{
    name: string;
    species: string;
    gender: string;
    age: number;
    description: string;
  }>;

  partition: string;

  creationDate: number;

  lastUpdateDate: number;
  
  constructor(data?: Partial<Fusion>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static instanceForCreate(data: Partial<Fusion>): Fusion {
    const { error } = fusionCreateSchema.validate(data);
    if (error) {
      throw new Error(`Invalid data for Fusion creation: ${error.message}`);
    }

    return new Fusion(data);
  }
}