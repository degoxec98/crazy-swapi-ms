import { Fusion } from "../domains/Fusion";
import { FusionFilter } from "../domains/FusionFilter";
import { DynamoRepository } from "../repositories/DynamoRepository";
import { SwapiRepository } from "../repositories/SwapiRepository";
import { WeatherRepository } from "../repositories/WeatherRepository";
import { SwapiService } from "./SwapiService";


export interface SwapiServiceProps {
  dynamoDbRepo: DynamoRepository;
  swapiRepo: SwapiRepository;
  weatherRepo: WeatherRepository;
  config: {},
}

export class SwapiServiceImpl implements SwapiService {
  constructor(private props: SwapiServiceProps) {}

  async findFusion(): Promise<Fusion> {
    try {
      const characterCode = this.getRandomCharacterCode();
      const character = await this.props.swapiRepo.findCharacterByCode(characterCode);

      const planet = await this.props.swapiRepo.findPlanetByUrl(character.homeworld);

      const weather = await this.props.weatherRepo.getWeatherByFilter(
        this.getRandomLatitude(),
        this.getRandomLongitude()
      );

      const fusion = new Fusion({ character, planet, weather });

      const createdFusion = await this.props.dynamoDbRepo.createFusion(fusion);

      return createdFusion;
    } catch (error) {
      console.error("Error in findFusion:", error);
      throw new Error("Failed to find fusion");
    }
  }

  async findHistory(nextToken?: string): Promise<FusionFilter> {
    try {
      const fusionFilter = await this.props.dynamoDbRepo.findFusionsByFilter(nextToken);
      return fusionFilter;
    } catch (error) {
      console.error("Error in findHistory:", error);
      throw new Error("Failed to find history");
    }
  }

  async createFusion(fusion: Fusion): Promise<Fusion> {
    try {
      const createdFusion = await this.props.dynamoDbRepo.createFusion(fusion);
      return createdFusion;
    } catch (error) {
      console.error("Error in createFusion:", error);
      throw new Error("Failed to create fusion");
    }
  }

  protected getRandomCharacterCode(): string {
    return (Math.floor(Math.random() * 83) + 1).toString(); // 1 to 83
  }

  protected getRandomLatitude(): number {
    return +(Math.random() * 120 - 60).toFixed(1);  // -60 to +60
  }
   
  protected getRandomLongitude(): number {
   return +(Math.random() * 300 - 150).toFixed(1); // -150 to +150
  }
}