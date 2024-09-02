import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Workbook } from 'exceljs';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

const extension='xlsx';
@Injectable()
export class ReportService {
  constructor(private readonly httpService: HttpService) {
  }
  async createReport(serviceName: string, endpoint: string, headers: string[]) {
    try {
      // Fetch data
      const response = await lastValueFrom(this.httpService.get(endpoint));
      const data = response.data;

      // Generate report
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Report');
      worksheet.addRow(headers);

      // Add data
      for (let item of data) {
        worksheet.addRow(headers.map(header => item[header]));
      };
      const reportDir = path.join(__dirname, '..', '..', 'reports');
      // Make the directory if it does not exist
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
      }
      const id=serviceName+"-"+Date.now();
      const fileName = id+"."+extension;
      const filePath = path.join(reportDir, fileName);

      // Write workbook to file
      await workbook.xlsx.writeFile(filePath);
      return id;
    } catch (error) {
      throw new HttpException('Failed to create report', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getReportStatus(id: string) {
    const fileName=id+"."+extension;
    const filePath = path.join(__dirname, '..', '..', 'reports', fileName);
    // Check if file exists to determine report status
    return fs.existsSync(filePath)
      ? { status: 'ready', url: 'http://localhost:3000/reports/'+fileName }
      : { status: 'not ready' };
  }
}
