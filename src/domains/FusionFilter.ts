import { Fusion } from "./Fusion";

export class FusionFilter {
  items: Fusion[];

  nextToken?: string;

  constructor(data?: Partial<FusionFilter>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}