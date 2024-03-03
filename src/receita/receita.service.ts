import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format, utcToZonedTime } from 'date-fns-tz';

@Injectable()
export class ReceitaService {

  constructor(private prisma: PrismaService){}
  async create(createReceitaDto: CreateReceitaDto) {
    
    const  receita = await this.prisma.receita.create({
      data: {
        nome: createReceitaDto.nome,
        valor: createReceitaDto.valor,
        dataReceita:  new Date(createReceitaDto.dataReceita)
      }
    })
    return {receita};
  }

  async findAll() {
    const receitasBd = await this.prisma.receita.findMany();
  
    const receita = receitasBd.map(receita => {
      const dataReceitaUTC = utcToZonedTime(receita.dataReceita, 'UTC');
      const dataFormatada = format(dataReceitaUTC, 'dd/MM/yyyy', { timeZone: 'UTC' });
  
      return {
        ...receita,
        dataReceita: dataFormatada,
      };
    });
  
    return {receitasFormatadas: receita};
  }

  async findOne(id: number) {
    const receita = await this.prisma.receita.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(receita == null){
      throw new NotFoundException('Receita não encontrada');
    }else{
      const dataReceitaUTC = utcToZonedTime(receita.dataReceita, 'UTC');
      const dataFormatada = format(dataReceitaUTC, 'dd/MM/yyyy', { timeZone: 'UTC' });
      
      let receitaUnica = {
        id: receita.id,
        nome: receita.nome,
        valor: receita.valor,
        dataReceita: dataFormatada
      }
  
      return {receitaUnica};
    }
}

  async update(id: number, updateReceitaDto: UpdateReceitaDto) {

    const validacaoId = await this.prisma.receita.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(validacaoId == null){
      throw new NotFoundException('Receita não encontrada');
    }else{
      const receita = await this.prisma.receita.update(
        {
          data: {
            nome:updateReceitaDto.nome,
            valor:updateReceitaDto.valor,
            dataReceita: new Date(updateReceitaDto.dataReceita)
          },
        where: {
          id: Number(id),
        },
      })
  
      return{receita}
    }
  }

  async remove(id: number) {

    const validacaoId = await this.prisma.receita.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(validacaoId == null){
      throw new NotFoundException('Receita não encontrada');
    }else{
      const receita = await this.prisma.receita.delete({
        where: {
          id: Number(id),
        },
      })
  
      return {
        mensagem: `A receita com o ID ${id}, foi removida!`
      };
    }
    
  }
}
