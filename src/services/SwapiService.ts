import { Fusion } from "../domains/Fusion";
import { FusionFilter } from "../domains/FusionFilter";

export interface SwapiService {
  findFusion(): Promise<Fusion>;

  findHistory(nextToken?: string): Promise<FusionFilter>;

  createFusion(fusion: Fusion): Promise<Fusion>;
}