import { Fusion } from "../domains/Fusion";
import { FusionFilter } from "../domains/FusionFilter";

export interface DynamoRepository {
  createFusion(fusion: Fusion): Promise<Fusion>;

  findFusionsByFilter(nextToken?: string): Promise<FusionFilter>;
}