export interface UserSchema {
	id: number,
	username: string,
	password: string,
	first_name: string,
	last_name: string,
	role_name: string
}

export interface AccountSchema {
    id: number,
    balance: number,
    type: string,
    owner_id: number
}