export class Transaction {

    id: number;
    amount: number;
    description: string;
    accountId: number;

    constructor(id: number, amt: number, descrip: string, aId: number){
        this.id = id;
        this.amount = amt;
        this.description = descrip;
        this.accountId = aId;
    }
}