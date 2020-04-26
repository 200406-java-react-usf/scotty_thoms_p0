import data from '../data/transaction-db';
import { Transaction } from '../models/transaction';
import { CrudRepository } from './crud-repo';
import Validator from '../util/validator';
import {
    WipError,
    ResourceNotFoundError,
    BadRequestError,
    InsuficentFundsError
} from '../errors/errors';

export class TransactionRepository implements CrudRepository<Transaction> {
    
    private static instance: TransactionRepository;

    private constructor() {};

    static getInstance() {
        return !TransactionRepository.instance ? TransactionRepository.instance = new TransactionRepository() : TransactionRepository.instance;
    }
    
    getAll(): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {

            setTimeout( () => {
                let allTransactions = [];

                for(let transaction of data){
                    allTransactions.push({...transaction});
                }
                if(allTransactions.length === 0){
                    reject(new ResourceNotFoundError('No users found'));
                }
    
                resolve(allTransactions);
            }, 1000);
           
        });
    };

    getById(id: number): Promise<Transaction> {
        return new Promise((resolve, reject) => {
            if (!Validator.isValidId(id)) {
                reject(new BadRequestError());
            }

            setTimeout(() => {
                const transaction = {...data.find(transaction => transaction.id === id)};

                if (Object.keys(transaction).length === 0){
                    reject(new ResourceNotFoundError());
                    return;
                }

                resolve(transaction);
            }, 1000);
        });
    }

    save(newTransaction: Transaction): Promise<Transaction> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        });
    }

    update(updatedTransaction: Transaction): Promise<boolean> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        });
    }
}