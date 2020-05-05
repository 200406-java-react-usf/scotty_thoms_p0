import express from 'express';
import AppConfig from '../config/app';
import { adminGuard } from '../middleware/auth-middlware';

export const AccountRouter = express.Router();

const accountService = AppConfig.accountService;

AccountRouter.get('', adminGuard, async (req, resp) => {
    try{
        let payload = await accountService.getAllAccounts();
        resp.status(200).json(payload);
    } catch (e){
        resp.status(404).json(e);
    }
});

AccountRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; //the plus sign is to type coerce id into a number
    try { 
        let payload = await accountService.getAccountById(id);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(404).json(e);
    }
})

AccountRouter.post('', async (req, resp) => {
    try {
        let newAccount = await accountService.addNewAccount(req.body);
        return resp.status(201).json(newAccount);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
})

AccountRouter.put('', async (req,resp) => {
    try {
        let updatedAccount = await accountService.updateAccount(req.body);
        return resp.status(202).json(updatedAccount);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
})