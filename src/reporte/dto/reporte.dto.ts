import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString } from 'class-validator';

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
  @IsString()
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
