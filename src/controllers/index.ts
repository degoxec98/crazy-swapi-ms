import { service } from "../services";
import { SwapiController } from "./SwapiController";

export const controller = new SwapiController({
  service,
  config: {},
});