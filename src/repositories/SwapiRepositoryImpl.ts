import axios from "axios";
import { SwapiRepository } from "./SwapiRepository";
import { SwapiCharacter } from "../domains/SwapiCharacter";
import { SwapiPlanet } from "../domains/SwapiPlanet";

export interface SwapiRepositoryProps {
  httpClient: typeof axios;
  config: {
    baseUrl: string;
  };
}

export class SwapiRepositoryImpl implements SwapiRepository {
  constructor(private props: SwapiRepositoryProps) {}

  async findCharacterByCode(code: string): Promise<SwapiCharacter> {
    try {
      const response = await this.props.httpClient.get(
        `${this.props.config.baseUrl}/people/${code}`,
      );
      console.log("Response data:", response.data);
      return this.unmarshalCharacter(response.data, code);
    } catch (error) {
      console.error("Error fetching character by code:", error);
      throw new Error("Failed to fetch character");
    }
  }

  async findPlanetByUrl(url: string): Promise<SwapiPlanet> {
    try {
      const response = await this.props.httpClient.get(url);
      console.log("Response data:", response.data);
      return this.unmarshalPlanet(response.data, url);
    } catch (error) {
      console.error("Error fetching planet by url:", error);
      throw new Error("Failed to fetch planet");
    }
  }

  private unmarshalCharacter(character: any, code: string): SwapiCharacter {
    return {
      code,
      name: character.name,
      height: character.height,
      mass: character.mass,
      gender: character.gender,
      homeworld: character.homeworld,
    }
  }

  private unmarshalPlanet(planet: any, url: string): SwapiPlanet {
    return {
      url,
      name: planet.name,
      population: planet.population,
      diameter: planet.diameter,
      gravity: planet.gravity,
      terrain: planet.terrain,
    }
  }
}