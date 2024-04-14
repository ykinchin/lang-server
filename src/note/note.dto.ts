import { Level } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsEnum(Level)
  @IsOptional()
  @Transform(({ value }) => ('' + value).toLocaleLowerCase())
  level?: Level;
}
