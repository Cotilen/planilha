export class Fixedrecipe {
    id?: number;
    name: string
    value: number
    id_user: number
    dateRecipe: string
    finalDate?: string | Date

    constructor(name: string, value: number, id_user: number, dateRecipe: string, finalDate: string) {
        this.name = name
        this.value = value
        this.id_user = id_user
        this.dateRecipe = dateRecipe
        this.finalDate = finalDate
    }
}
