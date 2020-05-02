export interface UserSchema {
	id: number,
	username: string,
	password: string,
	first_name: string,
	last_name: string,
	role_id: string
}

export interface AccountSchema {
    id: number,
    balance: number,
    account_type: string,
    owner_id: number
}

export interface TransactoinSchema {
    id: number,
    amount: number,
    description: string,
    account_id: number
}