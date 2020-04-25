import data from '../data/user-db';
import { User } from '../models/user';
import { CrudRepository } from './crud-repo';
import Validator from '../util/validator';
import {
    WipError
} from '../errors/errors';

export class UserRepository implements CrudRepository<User> {

    private static instance: UserRepository;

    private constructor() {};

    static getInstance() {
        return !UserRepository.instance ? UserRepository.instance = new UserRepository() : UserRepository.instance;
    }
    
    getAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        })
    }

    getById(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        })

    }

    save(newUser: User): Promise<User> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        })

    }

    update(updatedUser: User): Promise<boolean> {
        return new Promise((resolve, reject) => {
            reject(new WipError());
        })

    }
}

