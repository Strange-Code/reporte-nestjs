import { Module } from '@nestjs/common';
import { ReporteModule } from './reporte/reporte.module';

@Module({
  imports: [ReporteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
