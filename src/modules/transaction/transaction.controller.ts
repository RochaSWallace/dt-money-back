import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TransacaoService } from './transaction.service';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';
import { AtualizarTransacaoDto } from './dto/atualizar-transacao.dto';
import { Response } from 'express';
import { isUUID } from 'class-validator';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  async criar(
    @Body() criarTransacaoDto: CriarTransacaoDto,
    @Res() res: Response,
  ) {
    const transacaoCriada =
      await this.transacaoService.criar(criarTransacaoDto);
    res.status(201).send(transacaoCriada);
    return;
  }

  @Get()
  async buscarTodas(@Res() res: Response) {
    const transacoes = await this.transacaoService.buscarTodas();
    res.status(200).send(transacoes);
    return;
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(404).send({
        message: 'transação não encontrada',
        error: 'Não Encontrado',
        statusCode: 404,
      });
      return;
    }

    const transacao = await this.transacaoService.buscarPorId(id);
    if (!transacao) {
      res.status(404).send({
        message: 'transação não encontrada',
        error: 'Não Encontrado',
        statusCode: 404,
      });
      return;
    }
    res.status(200).send(transacao);
    return;
  }

  @Patch(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() atualizarTransacaoDto: AtualizarTransacaoDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(404).send({
        message: 'transação não encontrada',
        error: 'Não Encontrado',
        statusCode: 404,
      });
      return;
    }

    const transacaoAtualizada = await this.transacaoService.atualizar(
      id,
      atualizarTransacaoDto,
    );

    if (!transacaoAtualizada) {
      res.status(404).send({
        message: 'transação não encontrada',
        error: 'Não Encontrado',
        statusCode: 404,
      });
      return;
    }

    res.status(200).send(transacaoAtualizada);
    return;
  }

  @Delete(':id')
  async remover(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(404).send({
        message: 'transação não encontrada',
        error: 'Não Encontrado',
        statusCode: 404,
      });
      return;
    }

    const transacaoExiste = await this.transacaoService.remover(id);
    if (!transacaoExiste) {
      res.status(404).send({
        message: 'transação não encontrada',
        error: 'Não Encontrado',
        statusCode: 404,
      });
      return;
    }

    res.sendStatus(204);
    return;
  }
}
