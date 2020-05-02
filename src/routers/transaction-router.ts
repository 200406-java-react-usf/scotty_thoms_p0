import express from 'express';
import AppConfig from '../config/app';

export const TransactionRouter = express.Router();

const transactionService = AppConfig.transactionService;

TransactionRouter.get('/', async (req, resp) => {
    try{
        let payload = await transactionService.getAllTransactions();
        resp.status(200).json(payload);
    } catch (e){
        resp.status(404).json(e);
    }
});

TransactionRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; 
    try { 
        let payload = await transactionService.getTransactionById(id);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(404).json(e);
    }
})