import { UserRepository } from "../repos/user-repo";
import { ResourceNotFoundError, BadRequestError, AuthError, UsernameNotAvailableError, } from "../errors/errors";
import { isValidId, isEmptyObject, isValidStrings, isValidObject } from '../util/validator';
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

        let isAvailable = await this.userRepo.checkUsername(newUser.username);

        if (!isAvailable) {
            throw new UsernameNotAvailableError();
        }

        newUser.role = 'User';
        const persistedUser = await this.userRepo.save(newUser);

        return this.removePassword(persistedUser);

        
    }

    

    private removePassword(user: User): User {
        if(!user || !user.password) return user;
        delete user.password;
        return user;   
    }
}