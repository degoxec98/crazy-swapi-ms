import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { DynamoRepository } from "./DynamoRepository";
import { Fusion } from "../domains/Fusion";
import { FusionFilter } from "../domains/FusionFilter";

export interface DynamoRepositoryProps {
  dynamoDbClient: DynamoDBDocumentClient;
  config: {
    fusionTable: string;
    fusionPageSize: number;
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
        partition: "FUSION",
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

  async findFusionsByFilter(nextToken?: string): Promise<FusionFilter> {
    try {
      const exclusiveStartKey = nextToken
        ? JSON.parse(Buffer.from(nextToken, "base64").toString())
        : undefined;
      console.log("ExclusiveStartKey:", exclusiveStartKey);
      const { Items, LastEvaluatedKey } = await this.props.dynamoDbClient.send(
        new QueryCommand({
          TableName: this.props.config.fusionTable,
          IndexName: "creationDateIndex",
          KeyConditionExpression: "#p = :p",
          ExpressionAttributeNames: {
            "#p": "partition",
          },
          ExpressionAttributeValues: {
            ":p": "FUSION",
          },
          ScanIndexForward: false,
          ExclusiveStartKey: exclusiveStartKey,
          Limit: this.props.config.fusionPageSize,
        }),
      );

      if (Items && Items.length) {
        const fusions = Items.map((item) => this.unmarshalFusion(item));
        return new FusionFilter({
          items: fusions,
          nextToken: LastEvaluatedKey
            ? Buffer.from(JSON.stringify(LastEvaluatedKey)).toString("base64")
            : undefined,
        });
      }

      throw new Error("No fusions found");
    } catch (error) {
      console.error("Error finding fusions:", error);
      throw new Error("Failed to find fusions");
    }
  }

  private unmarshalFusion(fusion: any): Fusion {
    return new Fusion({
      id: fusion.id,
      character: fusion.character,
      planet: fusion.planet,
      weather: fusion.weather,
      custom: fusion.custom,
      creationDate: fusion.creationDate,
      lastUpdateDate: fusion.lastUpdateDate,
    });
  }
}