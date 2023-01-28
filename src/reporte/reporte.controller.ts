import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateReporteDto } from './dto/reporte.dto';
import { ReporteService } from './reporte.service';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Post()
  createReport(@Body() report: CreateReporteDto) {
    return this.reporteService.createReport(report);
  }

  @Delete('/:id')
  deleteReport(@Param('id') id: string) {
    return this.reporteService.deleteReport(id);
  }
}
