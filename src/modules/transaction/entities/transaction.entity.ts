export class Transacao {
  id: string;
  titulo: string;
  categoria: string;
  data: Date;
  preco: number;
  tipo: 'INCOME' | 'OUTCOME';
  criadoEm: Date;
  atualizadoEm: Date;
}