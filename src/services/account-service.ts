import { AccountRepository } from "../repos/account-repo";
import { ResourceNotFoundError } from "../errors/errors";

export class AccountSerivce {
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
}