import { Account } from '../models/account'
import { AccountRepository } from "../repos/account-repo";
import { ResourceNotFoundError, BadRequestError } from "../errors/errors";
import { isValidId, isEmptyObject } from '../util/validator';

export class AccountService {
    constructor (private accountRepo: AccountRepository) {
        this.accountRepo = accountRepo;
    }

    async getAllAccounts(): Promise<Account[]> {
        try {
            let accounts = await this.accountRepo.getAll();

            if (accounts.length === 0){
                throw new ResourceNotFoundError();
            }
            return accounts;
        } catch (e) {
            throw e;
        }
    }
    
    async getAccountById(id: number): Promise<Account> {
        try {
            if (!isValidId(id)) {
                throw new BadRequestError();
            }
            let account = await this.accountRepo.getById(id);
            if (isEmptyObject(account)) {
                throw new ResourceNotFoundError();
            }
            return account;
        } catch (e) {
            throw e;
        }
    }
}