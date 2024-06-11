export class Fixedexpense {
    name:string
    description:string
    value:number
    id_user:number
    id_category:number
    dateExpense:string
    finalDate: string | Date

    constructor(name:string, description:string, value:number, id_user:number, id_category:number, dateExpense:string, finalDate:string){
        this.name = name
        this.description = description
        this.value = value
        this.id_user = id_user
        this.id_category = id_category
        this.dateExpense = dateExpense
        this.finalDate = finalDate
    }
}
