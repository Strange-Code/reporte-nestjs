import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { TipoReporte } from './tipoReporte.enum';

export class CreateReporteDto {
  @IsString()
  reason: string;
  @IsString()
  deparment: string;
  @IsString()
  reportTo: string;
  @IsArray()
  @Type(() => CreateAttachDto)
  attached: CreateAttachDto[];
  @IsEnum(TipoReporte)
  type: string;
  @IsString()
  subject: string;
  @IsString()
  title: string;
  @IsString()
  justification: string;
}

export class CreateAttachDto {
  @IsString()
  type: string;
  @IsString()
  name: string;
  @IsString()
  url: string;
}
