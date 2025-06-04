import { Fusion } from "../domains/Fusion";

export interface DynamoRepository {
  createFusion(fusion: Fusion): Promise<Fusion>;
}