import { User } from "../models/user";
import { UserSchema, AccountSchema, TransactoinSchema } from "./schemas";
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";

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