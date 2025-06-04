import { SwapiCharacter } from "../domains/SwapiCharacter";
import { SwapiPlanet } from '../domains/SwapiPlanet';

export interface SwapiRepository {
  findCharacterByCode(code: string): Promise<SwapiCharacter>;
  findPlanetByUrl(url: string): Promise<SwapiPlanet>;
}