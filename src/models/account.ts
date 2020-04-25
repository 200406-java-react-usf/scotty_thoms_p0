export class Account {

    id: number;
    balance: number;
    type: string;
    ownerId: number;


    constructor(id: number, bal: number, type: string, oId: number ){
        this.id = id;
        this.balance = bal;
        this.type = type;
        this.ownerId = oId;
    }
}