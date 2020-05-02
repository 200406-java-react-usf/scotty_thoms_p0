import { User } from '../models/user';
import { CrudRepository } from './crud-repo';
import { InternalServerError } from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapUserResultSet } from '../util/result-set-mapper';

export class UserRepository implements CrudRepository<User> {

    baseQuery = `
    select
        u.id,
        u.username,
        u.password,
        u.first_name,
        u.last_name,
        ur.name as role_id
    from users u
    join user_roles ur
    on u.role_id = ur.id
    `;
    
    async getAll(): Promise<User[]> {

            let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `${this.baseQuery} order by u.id`;
                let rs = await client.query(sql);
                return rs.rows;
            } catch (e) {
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
           
        };

    async getById(id: number): Promise<User> {
        
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where u.id = $1`;
            let rs = await client.query(sql, [id]);
            return mapUserResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }

    }

    async save(newUser: User): Promise<User> {
        //WIP!
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `${this.baseQuery}`;
                let rs = await client.query(sql);
                return mapUserResultSet(rs.rows[0]);

            } catch (e) {
                throw new InternalServerError();
            } finally {
                client && client.release();
            }

    }

    async update(updatedUser: User): Promise<boolean> {
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
    
}
