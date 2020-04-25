import express from 'express';
import * as bodyparser from 'body-parser';
import { UserRepository } from './repos/user-repo';
import { UserRouter } from './routers/user-router';

const app = express();

app.use('/', bodyparser.json());

app.use('/users', UserRouter);

app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});
