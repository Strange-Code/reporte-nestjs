import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateReporteDto, UpdateReportDto } from './dto/reporte.dto';
import { ReporteService } from './reporte.service';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Get()
  getAllReports(@Query('status') status: string) {
    return this.reporteService.getReportsByStatus(status);
  }

  @Post()
  createReport(@Body() report: CreateReporteDto) {
    return this.reporteService.createReport(report);
  }

  @Put('/:id')
  updateReport(@Param('id') id: string, @Body() report: UpdateReportDto) {
    return this.reporteService.updateReport(id, report);
  }

  @Delete('/:id')
  deleteReport(@Param('id') id: string) {
    return this.reporteService.deleteReport(id);
  }
}
