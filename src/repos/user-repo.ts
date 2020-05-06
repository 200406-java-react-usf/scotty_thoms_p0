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
    
    /**
     * Gets all Users from database.
     * Need admin access.
     */
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

    /**
     * Gets a single User with id you send as param if it exists
     * @param id {nubmer} user id
     */
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

    /**
     * Used to login user. Will return User if username and password exist and are correct
     * @param un {string} username of user
     * @param pw {string} password of user
     */
    async getbyCredentials(un: string, pw: string) {
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where u.username = $1 and u.password = $2`
            let rs = await client.query(sql, [un, pw]);
            return mapUserResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    /**
     * Creates a new user with information provided
     * @param newUser {User} new user you want to create
     */
    async save(newUser: User): Promise<User> {
        let client: PoolClient;
        
        try {
            client = await connectionPool.connect();

            //WIP FIX FROM REVABOARDS
            let roleId = (await client.query('select id from user_roles where name = $1', [newUser.role])).rows[0].id;

            let sql = `
                insert into users (username, password, first_name, last_name, role_id)
                values ($1, $2, $3, $4, $5) returning id
            `;

            let rs = await client.query(sql, [newUser.username, newUser.password, newUser.firstname, newUser.lastname, roleId]);

            newUser.id = rs.rows[0].id;

            return newUser;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }

    }

    /**
     * Updates a user that you send in as param
     * Can only update username, password, first name, and last name (for now)
     * @param updatedUser {User} user you want updated
     */
    async update(updatedUser: User): Promise<boolean> {
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `
                    update users
                    set
                        username = $2,
                        password = $3,
                        first_name = $4,
                        last_name = $5
                    where id = $1
                `;
                await client.query(sql, [updatedUser.id, updatedUser.username, updatedUser.password, updatedUser.firstname, updatedUser.lastname]);
                
                return true;
            } catch (e) {
                console.log(e);
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    }

    /**
     * Deletes a user that you send in as a param
     * Need admin access. Only need user ID to delete.
     * @param userToDelete {User} user to delete
     */
    async delete(userToDelete: User): Promise<boolean> {
        let client: PoolClient;
            try { 
                client = await connectionPool.connect();
                let sql = `
                    delete from users
                    where id = $1
                `;
                await client.query(sql, [userToDelete.id]);
                return true;
            } catch (e) {
                console.log(e);
                throw new InternalServerError();
            } finally {
                client && client.release();
            }
    }

    // /**
    // /* NOT IMPLEMENTED
    //  * Will check the users table in database for key and value you send as params
    //  * @param key {string} key in database
    //  * @param val {string} value in database
    //  */
    // async getUserByUniqueKey(key: string, val: string): Promise<User> {

    //     let client: PoolClient;

    //     try {
    //         client = await connectionPool.connect();
    //         let sql = `${this.baseQuery} where u.${key} = $1`;
    //         let rs = await client.query(sql, [val]);
    //         return mapUserResultSet(rs.rows[0]);
    //     } catch (e) {
    //         throw new InternalServerError();
    //     } finally {
    //         client && client.release(); 
    //     }
    
    // }

    /**
     * Checks to see if the username exists in the database. 
     * @param username {string} username of user
     */
    async checkUsername(username: string): Promise<User> {
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `select * from users where username = $1`;
            let rs = await client.query(sql, [username]);
            return mapUserResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    
}
