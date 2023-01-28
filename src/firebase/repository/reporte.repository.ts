import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { ReporteEntity } from '../entity/reporte.entity';

@Injectable()
export class ReporteRepository {
  constructor(
    @Inject(ReporteEntity.collectionName)
    private reporteModel: CollectionReference<ReporteEntity>,
  ) {}

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
