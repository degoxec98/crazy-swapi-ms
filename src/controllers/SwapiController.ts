import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SwapiService } from "../services/SwapiService";

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
    // TODO: Implement the logic to find history
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "History found successfully" }),
    };
  }

  async createStore(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    // TODO: Implement the logic to create a store
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Store created successfully" }),
    }
  }
}