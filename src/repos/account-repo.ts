import { Account } from '../models/account';
import { CrudRepository } from './crud-repo';
import {
    InternalServerError
} from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapAccountResultSet } from '../util/result-set-mapper';

export class AccountRepository implements CrudRepository<Account> {
    
    baseQuery = `
    select
        a.id,
        a.balance,
        a.account_type,
        a.owner_id
    from accounts a
    `
    /**
     * Gets all Accounts from database.
     * Need admin access to access.
     */
    async getAll(): Promise<Account[]> {
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `${this.baseQuery} order by a.id`;
                let rs = await client.query(sql);
                return rs.rows;

            } catch (e) {
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    };

    /**
     * Gets a single Account with an id you send as param
     * @param id {number} the id of the account you want to find
     */
    async getById(id: number): Promise<Account> {
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `${this.baseQuery} where a.id = $1`;
                let rs = await client.query(sql, [id]);
                return mapAccountResultSet(rs.rows[0]);

            } catch (e) {
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    }

    /**
     * Creates a new account with information you send as param
     * @param newAccount {Account} new account you want to create
     */
    async save(newAccount: Account): Promise<Account> {
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `
                    insert into accounts (balance, account_type, owner_id) values
                    ($1, $2, $3) returning id
                `
                
                let rs = await client.query(sql, [newAccount.balance, newAccount.type, newAccount.ownerId]);
                newAccount.id = rs.rows[0].id;

                return newAccount;

            } catch (e) {
                console.log(e);
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    }

    /**
     * Updates an account that you send in as param.
     * Will only update account type (for now)
     * @param updatedAccount {Account} account you want updated
     */
    async update(updatedAccount: Account): Promise<boolean> {
        // only added functionality to update account type (for now)
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `
                    update accounts
                    set
                        account_type = $2
                    where id = $1
                `;
                let rs = await client.query(sql, [updatedAccount.id, updatedAccount.type]);
                return true;

            } catch (e) {
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    }

    /**
     * Deletes an account that you send in as a param
     * The only thing needed to delete an account is the account ID. Need Admin access to delete acct.
     * @param accountToDelete {Account} account you want to delete
     */
    async delete(accountToDelete: Account): Promise<boolean> {
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `
                    delete from accounts
                    where id = $1
                `;
                await client.query(sql, [accountToDelete.id]);
                return true;
            } catch (e) {
                console.log(e);
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    }

    // /**
    //  * NOT IMPLEMENTED
    //  * Will check the accounts table in database for key and value you send as params
    //  * @param key {string} key in database
    //  * @param val {string} value in database
    //  */ 
    // async getAccountByUniqueKey(key: string, val: string): Promise<Account> {

    //     let client: PoolClient;

    //     try {
    //         client = await connectionPool.connect();
    //         let sql = `${this.baseQuery} where a.${key} = $1`;
    //         let rs = await client.query(sql, [val]);
    //         return mapAccountResultSet(rs.rows[0]);
    //     } catch (e) {
    //         throw new InternalServerError();
    //     } finally {
    //         client && client.release();
    //     }
    // }

    /**
     * Returns an Account with id you send in as param if account exists
     * @param val {number} owner id 
     */
    async checkOwnerExists(val: number): Promise<Account> {
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `
                select * from users where id = $1
            `;
            let rs = await client.query(sql, [val]);
            return mapAccountResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}