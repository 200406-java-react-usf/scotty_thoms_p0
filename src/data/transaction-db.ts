import { Transaction } from '../models/transaction';
let id = 1;

export default [

    new Transaction (id++, 800, 'Rent', 1),
    new Transaction (id++, 40, 'Coffee', 1),
    new Transaction (id++, 500, 'Rent', 2),
    new Transaction (id++, 1000, 'T-Shirts', 3)
];