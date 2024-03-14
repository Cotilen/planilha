import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ReceitaModule } from './recipe/recipe.module';
import { UsuarioModule } from './users/user.module';
import { CategoriaDespesaModule } from './categoryExpense/categoryExpense.module';
import { DespesaModule } from './expense/expense.module';
import { FixedexpenseModule } from './fixedexpense/fixedexpense.module';
import { FixedrecipeModule } from './fixedrecipe/fixedrecipe.module';

@Module({
  imports: [PrismaModule, ReceitaModule, UsuarioModule, CategoriaDespesaModule, DespesaModule, FixedexpenseModule, FixedrecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
