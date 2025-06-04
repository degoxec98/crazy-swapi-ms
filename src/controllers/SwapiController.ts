import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SwapiService } from "../services/SwapiService";
import { Fusion } from "../domains/Fusion";

export interface SwapiControllerProps {
  service: SwapiService;
  config: {};
}

export class SwapiController {
  constructor(protected props: SwapiControllerProps) {}

  async findFusion(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const response = await this.props.service.findFusion();
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  }

  async findHistory(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const nextToken = event.queryStringParameters?.nextToken || undefined;

    const response = await this.props.service.findHistory(nextToken);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  }

  async createStore(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const body = JSON.parse(event.body || "{}");
    const fusion = Fusion.instanceForCreate({
      custom: {
        name: body.custom?.name,
        species: body.custom?.species,
        gender: body.custom?.gender,
        age: body.custom?.age,
        description: body.custom?.description,
      },
    });

    const response = await this.props.service.createFusion(fusion);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  }
}