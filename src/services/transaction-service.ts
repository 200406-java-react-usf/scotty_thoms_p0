import { TransactionRepository } from "../repos/transaction-repo";
import { ResourceNotFoundError, BadRequestError } from "../errors/errors";
import { Transaction } from "../models/transaction";
import { isValidId, isEmptyObject } from "../util/validator";

export class TransactionService {
    constructor (private transactionRepo: TransactionRepository) {
        this.transactionRepo = transactionRepo;
    }

    async getAllTransactions(): Promise<Transaction[]> {
        try {
            let transactions = await this.transactionRepo.getAll();

            if (transactions.length === 0) {
                throw new ResourceNotFoundError();
            }

            return transactions;
        } catch (e) {
            throw e;
        }
    }

    async getTransactionById(id: number): Promise<Transaction> {
        try {
            if (!isValidId(id)) {
                throw new BadRequestError();
            }

            let transaction = await this.transactionRepo.getById(id);

            if (isEmptyObject(transaction)) {
                throw new ResourceNotFoundError();
            }

            return transaction;
        } catch (e) {
            throw e;
        }
    }
}