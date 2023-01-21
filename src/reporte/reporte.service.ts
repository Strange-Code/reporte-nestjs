import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/reporte.dto';

@Injectable()
export class ReporteService {
  createReport(report: CreateReporteDto) {
    console.log(report);
    return report;
  }
}
