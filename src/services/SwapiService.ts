import { Fusion } from "../domains/Fusion";

export interface SwapiService {
  findFusion(): Promise<Fusion>;
}