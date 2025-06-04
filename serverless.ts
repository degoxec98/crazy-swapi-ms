import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "crazy-swapi-ms",
  frameworkVersion: "3.38.0",
  configValidationMode: "error",
  plugins: [
    "serverless-esbuild",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    region: "us-east-1",
    stage: "dev",
    environment: {
      FUSION_TABLE: "FusionTable",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      SWAPI_BASE_URL: "https://swapi.info/api/",
      WEATHER_BASE_URL: "https://api.open-meteo.com/v1/",
      FUSION_PAGE_SIZE: "5",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
        ],
        Resource: [
          { "Fn::GetAtt": ["FusionTable", "Arn"] },
          {
            "Fn::Join": [
              "/",
              [{ "Fn::GetAtt": ["FusionTable", "Arn"] }, "index", "creationDateIndex"]
            ]
          }
        ],
      }
    ]
  },

  functions: {
    crazy_swapi: {
      handler: "src/handlers/index.crazySwapi",
      events: [
        {
          http: {
            path: "fusion",
            method: "get",
            cors: true
          }
        },
        {
          http: {
            path: "history",
            method: "get",
            cors: true
          }
        },
        {
          http: {
            path: "store",
            method: "post",
            cors: true
          }
        }
      ],
    },
  },

  resources: {
    Resources: {
      FusionTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "FusionTable",
          AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "partition", AttributeType: "S" },
            { AttributeName: "creationDate", AttributeType: "N" }
          ],
          KeySchema: [
            { AttributeName: "id", KeyType: "HASH" }
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "creationDateIndex",
              KeySchema: [
                { AttributeName: "partition", KeyType: "HASH" },
                { AttributeName: "creationDate", KeyType: "RANGE" }
              ],
              Projection: { ProjectionType: "ALL" },
            }
          ],
          BillingMode: "PAY_PER_REQUEST"
        }
      }
    }
  },

  package: {
    individually: true
  },

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node20",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10
    }
  }
};

module.exports = serverlessConfiguration;
