import express from 'express';
import AppConfig from '../config/app';
import { Account } from '../models/account';
import { AccountRepository } from '../repos/account-repo';

export const AccountRouter = express.Router();

const accountService = AppConfig.accountService;

AccountRouter.get('', async (req, resp) => {
    try{
        let payload = await accountService.getAll();
        resp.status(200).json(payload).send();
    } catch (e){
        resp.status(404).json(e).send();
    }
});

AccountRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; //the plus sign is to type coerce id into a number
    try { 
        let payload = await accountService.getById(id);
        resp.status(200).json(payload).send();
    } catch (e) {
        resp.status(404).json(e).send();
    }
})