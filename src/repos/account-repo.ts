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

    async update(updatedTransaction: Account): Promise<boolean> {
        //WIP!
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `${this.baseQuery}`;
                let rs = await client.query(sql);
                return true;

            } catch (e) {
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    }


    async getAccountByUniqueKey(key: string, val: string): Promise<Account> {

        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where a.${key} = $1`;
            let rs = await client.query(sql, [val]);
            return mapAccountResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
        
    
    }
}