import { AccountSchema } from "./schemas";
import { Account } from "../models/account";

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