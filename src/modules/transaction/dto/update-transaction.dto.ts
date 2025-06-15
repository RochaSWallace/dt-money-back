import { PartialType } from '@nestjs/mapped-types';
import { CriarTransacaoDto } from './criar-transacao.dto';

export class AtualizarTransacaoDto extends PartialType(CriarTransacaoDto) {}