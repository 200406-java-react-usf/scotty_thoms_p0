import express from 'express';
import * as bodyparser from 'body-parser';
import { UserRepository } from './repos/user-repo';
import { UserRouter } from './routers/user-router';
import { TransactionRouter } from './routers/transaction-router';
import { AccountRouter } from './routers/account-router';

const app = express();

app.use('/', bodyparser.json());

app.use('/users', UserRouter);
app.use('/transactions', TransactionRouter);
app.use('/accounts', AccountRouter);

app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});
