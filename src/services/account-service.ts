import { Account } from '../models/account'
import { AccountRepository } from "../repos/account-repo";
import { ResourceNotFoundError, BadRequestError, ResourcePersistenceError } from "../errors/errors";
import { isValidId, isEmptyObject, isValidObject, isPropertyOf, isValidStrings } from '../util/validator';

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

    async addNewAccount(newAccount: Account): Promise<Account> {

        if (!isValidObject(newAccount)) {
            throw new BadRequestError();
        }

        let ownerExists = await this.checkOwnerExists(newAccount.ownerId);

        if (!ownerExists) {
            throw new ResourcePersistenceError('No account exists with User provided.')
        }
        
        const persistedAccount = await this.accountRepo.save(newAccount);

        return persistedAccount;
    }

    async getAccountByUniqueKey(queryObj: any): Promise<Account> {

        try {

            let queryKeys = Object.keys(queryObj);

            if(!queryKeys.every(key => isPropertyOf(key, Account))) {
                throw new BadRequestError();
            }

            // only supports single param searches (for now)
            let key = queryKeys[0];
            let val = queryObj[key];

            // if they are searching for an account by id, reuse the logic we already have
            if (key === 'id') {
                return await this.getAccountById(+val);
            }

            if(!isValidStrings(val)) {
                throw new BadRequestError();
            }

            // have to change wording to work with db
            if (key === 'ownerId') {
                key = 'owner_id';
            }

            let account = await this.accountRepo.getAccountByUniqueKey(key, val);
            if (isEmptyObject(account)) {
                throw new ResourceNotFoundError();
            }
            return account;

        } catch (e) {
            throw e;
        }
    }

    async checkOwnerExists(ownerId: number): Promise<boolean> {
        try {
            await this.getAccountByUniqueKey({'ownerId': ownerId})
        } catch (e) {
            console.log(`No account found with id ${ownerId}. Try again.`);
            return false;
        }

        console.log(`Account exists with id ${ownerId}. Proceed.`);
        return true;
    }
}