import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format, utcToZonedTime } from 'date-fns-tz';

@Injectable()
export class ReceitaService {

  constructor(private prisma: PrismaService){}
  async create(createReceitaDto: CreateDespesaDto) {
    const  receita = await this.prisma.receita.create({
      data: {
        nome: createReceitaDto.nome,
        valor: createReceitaDto.valor,
        dataReceita:  new Date(createReceitaDto.dataReceita),
        id_usuario: createReceitaDto.id_usuario
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
  
    return {receita};
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
        dataReceita: dataFormatada,
        id_usuario: receita.id_usuario
      }
  
      return {receitaUnica};
    }
}

  async update(id: number, updateReceitaDto: UpdateDespesaDto) {

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

  async findReceitaByUsuario(id: number){
    const receitaBd =  await this.prisma.receita.findMany({
      where:{
        id_usuario: Number(id),
      }
    })

    const receita = receitaBd.map(receita => {
      const dataReceitaUTC = utcToZonedTime(receita.dataReceita, 'UTC');
      const dataFormatada = format(dataReceitaUTC, 'dd/MM/yyyy', { timeZone: 'UTC' });
  
      return {
        ...receita,
        dataReceita: dataFormatada,
      };
    });

    return {receita}
  }
}
