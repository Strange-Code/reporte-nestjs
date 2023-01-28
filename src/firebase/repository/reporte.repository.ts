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
    this.reporteModel.add(reporteEntity);
  }
}
