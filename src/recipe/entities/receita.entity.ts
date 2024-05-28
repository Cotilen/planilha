export class Receita {
    id?: number;
    name: string;
    value: number;
    dateRecipe: string;
    id_user: number;

    constructor(name: string, value: number, dateRecipe: string, id_user: number) {
        this.name = name;
        this.value = value;
        this.dateRecipe = dateRecipe;
        this.id_user = id_user;
    }

}

