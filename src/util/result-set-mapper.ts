import { User } from "../models/user";
import { UserSchema, AccountSchema } from "./schemas";
import { Account } from "../models/account";

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
		resultSet.role_name
	);
}

export function mapAccountResultSet(resultSet: AccountSchema): Account {
    
    if (!resultSet) {
        return {} as Account;
    }

    return new Account (
        resultSet.id,
        resultSet.balance,
        resultSet.type,
        resultSet.owner_id
    );
}