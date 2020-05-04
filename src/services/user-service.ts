import { UserRepository } from "../repos/user-repo";
import { ResourceNotFoundError, BadRequestError, AuthError, ResourcePersistenceError, } from "../errors/errors";
import { isValidId, isEmptyObject, isValidStrings, isValidObject, isPropertyOf } from '../util/validator';
import { User } from "../models/user";

export class UserService {
    constructor (private userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async getAllUsers(): Promise<User[]> {
        try {
            let users = await this.userRepo.getAll();

            if (users.length === 0) {
                throw new ResourceNotFoundError();
            }

            return users.map(this.removePassword);
        } catch (e) {
            throw e;
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            if(!isValidId(id)) {
                throw new BadRequestError();
            }

            let user = await this.userRepo.getById(id);

            if (isEmptyObject(user)) {
                throw new ResourceNotFoundError();
            }

            return this.removePassword(user);
        } catch (e) {
            throw e;
        }
    }

    async authenticateUser(un: string, pw: string): Promise<User> {
        try {
            if (!isValidStrings(un,pw)) {
                throw new BadRequestError();
            }

            let authUser: User = await this.userRepo.getbyCredentials(un,pw);

            if (isEmptyObject(authUser)) {
                throw new AuthError();
            }

            return this.removePassword(authUser);
        } catch (e) {
            throw e;
        }
    }

    async addNewUser(newUser: User): Promise<User> {

        if (!isValidObject(newUser)) {
            throw new BadRequestError();
        }

        let isAvailable = await this.checkUsername(newUser.username);

        if (!isAvailable) {
            throw new ResourcePersistenceError('This username is already taken. Please pick another.');
        }

        newUser.role = 'User';
        const persistedUser = await this.userRepo.save(newUser);

        return this.removePassword(persistedUser);

        
    }

    async getUserByUniqueKey(queryObj: any): Promise<User> {

        try {

            let queryKeys = Object.keys(queryObj);

            if(!queryKeys.every(key => isPropertyOf(key, User))) {
                throw new BadRequestError();
            }

            // only supports single param searches (for now)
            let key = queryKeys[0];
            let val = queryObj[key];

            // if they are searching for a user by id, reuse the logic we already have
            if (key === 'id') {
                return await this.getUserById(+val);
            }

            if(!isValidStrings(val)) {
                throw new BadRequestError();
            }

            let user = await this.userRepo.getUserByUniqueKey(key, val);

            if (isEmptyObject(user)) {
                throw new ResourceNotFoundError();
                
            }

            return this.removePassword(user);

        } catch (e) {
            throw e;
        }
    }

    async checkUsername(username: string): Promise<boolean> {
        
        try {
            await this.getUserByUniqueKey({"username": username});
        } catch (e) {
            console.log(`username ${username} is available.`);
            return true;
        } 
  
        console.log(`username ${username} is already taken.`);
        return false;
      }

    

    private removePassword(user: User): User {
        if(!user || !user.password) return user;
        delete user.password;
        return user;   
    }
}