import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportStatus } from 'src/common/report-status.enum';
import { AppErrors } from 'src/common/response-status.const';
import { ResponseDto } from 'src/common/response.dto';
import { ReporteEntity } from 'src/firebase/entity/reporte.entity';
import { ReporteRepository } from 'src/firebase/repository/reporte.repository';
import { CreateReporteDto, UpdateReportDto } from './dto/reporte.dto';

@Injectable()
export class ReporteService {
  constructor(private readonly reporteRepository: ReporteRepository) {}

  async getReportsByStatus(status: string) {
    if (status == undefined) {
      throw new BadRequestException();
    }

    const responseFire = await this.reporteRepository.getAllByStatus(status);
    return new ResponseDto(AppErrors.OK, responseFire);
  }

  async createReport(report: CreateReporteDto) {
    let response;

    const reportEntity: ReporteEntity = {
      isActive: true,
      status: ReportStatus.CREADO,
      ...report,
    };
    const responseFire = await this.reporteRepository.save(reportEntity);

    if (responseFire) {
      response = {
        code: 200,
        message: 'Operación exitosa',
      };
    } else {
      response = {
        code: 500,
        message: 'Operación no realizada',
      };
    }
    return response;
  }

  async updateReport(id: string, report: UpdateReportDto) {
    await this.reporteRepository.update(id, report);
    return new ResponseDto(AppErrors.OK);
  }

  async deleteReport(id: string) {
    let response;
    const responseFire = await this.reporteRepository.delete(id);
    if (responseFire == 200) {
      response = {
        code: 200,
        message: 'Operación exitosa',
      };
    } else if (responseFire == 404) {
      response = {
        code: 404,
        message: 'Reporte no existe',
      };
    } else {
      response = {
        code: 500,
        message: 'Operación no realizada',
      };
    }
    return response;
  }
}
