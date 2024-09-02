import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as express from 'express';
//import * as serveIndex from 'serve-index';

async function bootstrap() {
  const portNumber=3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reportsPath = path.join(__dirname, '..', 'reports');
  app.use('/reports', express.static(reportsPath));
  //app.use('/reports', serveIndex(reportsPath, { icons: true, view: 'details' }));
  await app.listen(portNumber);
  console.log('Generator running on '+ portNumber);
}

bootstrap();
