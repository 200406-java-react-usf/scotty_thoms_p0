import data from '../data/account-db';
import { Account } from '../models/account';
import { CrudRepository } from './crud-repo';
import Validator from '../util/validator';
import {
    WipError,
    ResourceNotFoundError,
    BadRequestError
} from '../errors/errors';

export class AccountRepository implements CrudRepository<Account> {
    
    private static instance: AccountRepository;

    private constructor() {};

    static getInstance() {
        return !AccountRepository.instance ? AccountRepository.instance = new AccountRepository() : AccountRepository.instance;
    }
    
    getAll(): Promise<Account[]> {
        return new Promise((resolve, reject) => {

            setTimeout( () => {
                let allAccounts = [];

                for(let account of data){
                    allAccounts.push({...account});
                }
                if(allAccounts.length === 0){
                    reject(new ResourceNotFoundError('No accounts found'));
                }
    
                resolve(allAccounts);
            }, 1000);
           
        });
    };

    getById(id: number): Promise<Account> {
        return new Promise((resolve, reject) => {

            if (!Validator.isValidId(id)) {
                reject(new BadRequestError());
            }

            setTimeout(() => {
                const act = {...data.find(act => act.id === id)};

                if (Object.keys(act).length === 0){
                    reject(new ResourceNotFoundError());
                    return;
                }

                resolve(act);
            }, 1000);
        });
    }

    save(newTransaction: Account): Promise<Account> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        });
    }

    update(updatedTransaction: Account): Promise<boolean> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        });
    }
}