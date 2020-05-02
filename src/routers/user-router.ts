import express from 'express';
import AppConfig from '../config/app';
import { adminGuard } from '../middleware/auth-middlware';
import { isEmptyObject } from '../util/validator';
import { ParsedUrlQuery } from 'querystring';
import { User } from '../models/user';

export const UserRouter = express.Router();

const userService = AppConfig.userService;


UserRouter.get('', adminGuard, async (req, resp) => {
    try{

        let payload = await userService.getAllUsers();
        resp.status(200).json(payload);
    } catch (e){
        resp.status(404).json(e);
    }
});

UserRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; //the plus sign is to type coerce id into a number
    try { 
        let payload = await userService.getUserById(id);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(404).json(e);
    }
});

UserRouter.post('/new', async (req, resp) => {
    try {
        let newUser = await userService.addNewUser(req.body);
        return resp.status(201).json(newUser);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
})