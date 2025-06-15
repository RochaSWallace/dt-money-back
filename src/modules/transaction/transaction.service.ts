import { Injectable } from '@nestjs/common';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';
import { AtualizarTransacaoDto } from './dto/atualizar-transacao.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Transacao } from './entities/transacao.entity';

@Injectable()
export class TransacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async criar({ categoria, data, preco, titulo, tipo }: CriarTransacaoDto) {
    const dataObj = new Date(data);
    const transacaoCriada = await this.prisma.transaction.create({
      data: {
        title: titulo,
        category: categoria,
        data: dataObj,
        price: preco,
        type: tipo,
      },
    });
    return transacaoCriada;
  }

  async buscarTodas(): Promise<Transacao[]> {
    const transacoes = await this.prisma.transaction.findMany({
      orderBy: {
        data: 'desc',
      },
    });
    return transacoes;
  }

  async buscarPorId(id: string): Promise<Transacao | null> {
    const transacao = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    return transacao;
  }

  async atualizar(
    id: string,
    atualizarTransacaoDto: AtualizarTransacaoDto,
  ): Promise<Transacao | false> {
    const transacaoExiste = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!transacaoExiste) {
      return false;
    }

    const transacaoAtualizada = await this.prisma.transaction.update({
      where: {
        id,
      },
      data: atualizarTransacaoDto,
    });
    return transacaoAtualizada;
  }

  async remover(id: string): Promise<boolean> {
    const transacaoExiste = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!transacaoExiste) {
      return false;
    }

    await this.prisma.transaction.delete({
      where: {
        id,
      },
    });
    return true;
  }
}
