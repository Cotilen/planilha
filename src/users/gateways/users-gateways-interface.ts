import { Expense } from './../../expense/entities/despesa.entity';
import { Fixedrecipe } from './../../fixedrecipe/entities/fixedrecipe.entity';
import { Fixedexpense } from './../../fixedexpense/entities/fixedexpense.entity';
import { Receita } from './../../recipe/entities/receita.entity';
import { User } from "../entities/usuario.entity";
import { Login } from '../entities/login.entity';

export interface UsersGatewaysInterface{
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, user: User): Promise<User>;
    remove(id: number);
    findDataBydateAndUser(date: number, user: number): Promise<{recipe: Receita[],fixedrecipe: Fixedrecipe[],expense: Expense[],fixedexpense: Fixedexpense[], saldo: number}>
    findDataByDate(date: number, user:number): Promise<{recipe: Receita[],fixedrecipe: Fixedrecipe[],expense: Expense[],fixedexpense: Fixedexpense[]}>
    login(email:string, password:string): Promise<Login>

}