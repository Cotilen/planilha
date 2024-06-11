export class Expense {
    name:string
    description:string
    value:number
    dateExpense:string
    id_user:number
    id_category:number

    constructor(name:string,description:string,value:number,dateExpense:string,id_user:number,id_category:number){
        this.name=name
        this.description=description
        this.value=value
        this.dateExpense=dateExpense
        this.id_user=id_user
        this.id_category=id_category
    }
}
