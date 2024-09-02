import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    HttpModule,
    ReportModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'reports'),
      serveRoot: '/reports',
    }),
  ],
})
export class AppModule {}
