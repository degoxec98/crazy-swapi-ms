import { SwapiCharacter } from "./SwapiCharacter";
import { SwapiPlanet } from "./SwapiPlanet";
import { Weather } from "./Weather";


export class Fusion {
  id: string;

  character: SwapiCharacter;

  planet: SwapiPlanet;

  weather: Weather;

  creationDate: number;

  lastUpdate: number;
  
  constructor(data?: Partial<Fusion>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}