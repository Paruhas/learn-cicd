//lambda.ts
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import {
  APIGatewayEvent as AWSAPIGatewayEvent,
  Context as AWSContext,
  Handler as AWSLambdaHandler,
} from 'aws-lambda';

import { AppModule } from './app.module';

let cachedServer: AWSLambdaHandler;

export const handler = async (
  event: AWSAPIGatewayEvent,
  context: AWSContext,
) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context, (err, result) => {
    if (err) {
      console.error(`AWSLambdaHandler error`, err);
    } else {
      console.info(`AWSLambdaHandler successful`, result);
    }
  });
};
