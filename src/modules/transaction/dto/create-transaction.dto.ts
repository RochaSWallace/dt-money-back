import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CriarTransacaoDto {
  @IsString({ message: 'título deve ser uma string' })
  @MinLength(5, { message: 'título deve ter pelo menos 5 caracteres' })
  titulo: string;

  @IsString({ message: 'categoria deve ser uma string' })
  @MinLength(3, { message: 'categoria deve ter pelo menos 3 caracteres' })
  categoria: string;

  @IsISO8601(
    { strict: true },
    { message: 'data deve ser uma string ISO8601 válida' },
  )
  data: string;

  @IsNumber({}, { message: 'preço deve ser um número' })
  preco: number;

  @IsEnum(TransactionType, { message: 'tipo deve ser INCOME ou OUTCOME' })
  tipo: TransactionType;
}