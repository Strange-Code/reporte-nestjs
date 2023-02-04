import {
  BadGatewayException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { ReporteEntity } from '../entity/reporte.entity';

@Injectable()
export class ReporteRepository {
  constructor(
    @Inject(ReporteEntity.collectionName)
    private reporteModel: CollectionReference<ReporteEntity>,
  ) {}

  async getAll() {
    try {
      const fireReports = await this.reporteModel
        .where('isActive', '==', true)
        .select('type', 'reason', 'deparment', 'reportTo')
        .get();

      if (fireReports.empty) {
        throw new NotFoundException();
      }

      const reports = fireReports.docs.map((report) => {
        const reportMap = report.data();
        return reportMap;
      });

      return reports;
    } catch (error: any) {
      console.log(JSON.stringify(error));
      if (error.code == 7) {
        throw new BadGatewayException();
      }
      throw error;
    }
  }

  async save(reporteEntity: ReporteEntity) {
    let save = false;

    try {
      await this.reporteModel.add(reporteEntity);
      save = true;
      return save;
    } catch (error) {
      console.log(error);
      return save;
    }
  }

  async delete(id: string) {
    let update = 500;

    try {
      await this.reporteModel.doc(id).update({ isActive: false });
      update = 200;
      return update;
    } catch (error: any) {
      console.log(JSON.stringify(error));
      if (error.code == 5) {
        update = 404;
      }
      return update;
    }
  }
}
