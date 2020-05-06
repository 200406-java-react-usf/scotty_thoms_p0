import express from 'express';
import AppConfig from '../config/app';
import { adminGuard } from '../middleware/auth-middlware';

export const AccountRouter = express.Router();

const accountService = AppConfig.accountService;

/**
 * Used to get all accounts in database. 
 * Need Admin access.
 */
AccountRouter.get('', adminGuard, async (req, resp) => {
    try{
        let payload = await accountService.getAllAccounts();
        resp.status(200).json(payload);
    } catch (e){
        resp.status(404).json(e);
    }
});

/**
 * Used to get account by specific id
 */
AccountRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; //the plus sign is to type coerce id into a number
    try { 
        let payload = await accountService.getAccountById(id);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(404).json(e);
    }
})

/**
 * Used to create a new account
 */
AccountRouter.post('', async (req, resp) => {
    try {
        let newAccount = await accountService.addNewAccount(req.body);
        return resp.status(201).json(newAccount);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
})

/**
 * Used to update account that already exists in database
 */
AccountRouter.put('', async (req,resp) => {
    try {
        let updatedAccount = await accountService.updateAccount(req.body);
        return resp.status(202).json(updatedAccount);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
})

/**
 * Used to delete an account in the database
 */
AccountRouter.delete('', adminGuard, async (req, resp) => {
    try {
        let accountToBeDeleted = await accountService.deleteAccount(req.body);
        return resp.status(202).json(accountToBeDeleted);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
})