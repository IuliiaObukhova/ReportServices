import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {
  }

  /*
  example Post body:
    {
      "serviceName": "ReportRequester",
      "endpoint": "http://localhost:10000/data",
      "headers": ["id", "name", "email"]
    }
  example Post body with pagination:
    {
      "serviceName": "ReportRequesterService",
      "endpoint": "http://localhost:10000/data?page=2&limit=3",
      "headers": ["id", "name", "email"]
    }
  */
  @Post('create')
  async createReport(@Body() body: { serviceName: string; endpoint: string; headers: string[] }) {
    const { serviceName, endpoint, headers } = body;
    const documentId = await this.reportService.createReport(serviceName, endpoint, headers);
    return { documentId };
  }

  @Get('status/:id')
  async getReportStatus(@Param('id') id: string) {
    return await this.reportService.getReportStatus(id);
  }
}
