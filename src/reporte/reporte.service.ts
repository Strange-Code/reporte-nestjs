import { Injectable } from '@nestjs/common';
import { AppErrors } from 'src/common/response-status.const';
import { ResponseDto } from 'src/common/response.dto';
import { ReporteEntity } from 'src/firebase/entity/reporte.entity';
import { ReporteRepository } from 'src/firebase/repository/reporte.repository';
import { CreateReporteDto } from './dto/reporte.dto';

@Injectable()
export class ReporteService {
  constructor(private readonly reporteRepository: ReporteRepository) {}

  async getAllReports() {
    const responseFire = await this.reporteRepository.getAll();
    return new ResponseDto(AppErrors.OK, responseFire);
  }

  async createReport(report: CreateReporteDto) {
    let response;

    const reportEntity: ReporteEntity = {
      isActive: true,
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
