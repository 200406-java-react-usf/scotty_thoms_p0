import { Transaction } from '../models/transaction';
import { CrudRepository } from './crud-repo';
import {
    InternalServerError
} from '../errors/errors';
import { PoolClient, Pool } from 'pg';
import { connectionPool } from '..';
import { mapTransactionResultSet } from '../util/result-set-mapper';

export class TransactionRepository implements CrudRepository<Transaction> {
    
    baseQuery = `
    select
        t.id,
        t.amount,
        t.description,
        t.account_id
    from transactions t
    `
    
    
    async getAll(): Promise<Transaction[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} order by t.id`;
            let rs = await client.query(sql);
            return rs.rows;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async getById(id: number): Promise<Transaction> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where t.id = $1`;
            let rs = await client.query(sql, [id]);
            return mapTransactionResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async save(newTransaction: Transaction): Promise<Transaction> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `
            insert into transactions (amount, description, account_id) values
            ($1, $2, $3) returning id
            `;

            let rs = await client.query(sql, [newTransaction.amount, newTransaction.description, newTransaction.accountId]);
            newTransaction.id = rs.rows[0].id;
            
            return newTransaction;

        } catch (e) {
            console.log(e);
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async update(updatedTransaction: Transaction): Promise<boolean> {
        //WIP
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

    async getTransactionByUniqueKey(key: string, val: string): Promise<Transaction> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where t.${key} = $1`;
            let rs = await client.query(sql, [val]);
            return mapTransactionResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async checkAccountExists(accountId: number): Promise<Transaction> {
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `
                select * from accounts where id = $1
            `
            let rs = await client.query(sql, [accountId]);
            return mapTransactionResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async getAccountBalance(accountId: number): Promise<number> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `
                select balance from accounts where id = $1
            `;
            let rs = await client.query(sql, [accountId]);
            return (rs.rows[0].balance);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}