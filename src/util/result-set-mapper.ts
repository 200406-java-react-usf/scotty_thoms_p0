import { User } from "../models/user";
import { UserSchema, AccountSchema, TransactoinSchema } from "./schemas";
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";

/**
 * Maps the values that the database sends to a readable User object
 * @param resultSet {UserSchema} Schema used in mapping
 */
export function mapUserResultSet(resultSet: UserSchema): User {

	if (!resultSet) {
		return {} as User;
	}

	return new User (
		resultSet.id,
		resultSet.username,
		resultSet.password,
		resultSet.first_name,
		resultSet.last_name,
        resultSet.role_id
	);
}

/**
 * Maps the values that the database sends to a readable Account object
 * @param resultSet {UserSchema} Schema used in mapping
 */
export function mapAccountResultSet(resultSet: AccountSchema): Account {
    
    if (!resultSet) {
        return {} as Account;
    }

    return new Account (
        resultSet.id,
        resultSet.balance,
        resultSet.account_type,
        resultSet.owner_id
    );
}

/**
 * Maps the values that the database sends to a readable Transaction object
 * @param resultSet {UserSchema} Schema used in mapping
 */
export function mapTransactionResultSet(resultSet: TransactoinSchema): Transaction {

    if (!resultSet) {
        return {} as Transaction;
    }

    return new Transaction (
        resultSet.id,
        resultSet.amount,
        resultSet.description,
        resultSet.account_id
    )
}