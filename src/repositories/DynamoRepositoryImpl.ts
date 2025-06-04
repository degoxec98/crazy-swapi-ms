import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { DynamoRepository } from "./DynamoRepository";
import { Fusion } from "../domains/Fusion";

export interface DynamoRepositoryProps {
  dynamoDbClient: DynamoDBDocumentClient;
  config: {
    fusionTable: string;
  };
}

export class DynamoRepositoryImpl implements DynamoRepository {
  constructor(private props: DynamoRepositoryProps) {}

  protected getUUID() {
    return randomUUID();
  }

  protected getTimestamp() {
    return Date.now();
  }

  async createFusion(fusion: Fusion): Promise<Fusion> {
    try {
      const request = {
        ...fusion,
        id: this.getUUID(),
        creationDate: this.getTimestamp(),
        lastUpdateDate: this.getTimestamp(),
      };
  
      await this.props.dynamoDbClient.send(
        new PutCommand({
          TableName: this.props.config.fusionTable,
          Item: request,
        }),
      );
      return new Fusion({ ...request });
    } catch (error) {
      console.error("Error creating fusion:", error);
      throw new Error("Failed to create fusion");
    }
  }
}