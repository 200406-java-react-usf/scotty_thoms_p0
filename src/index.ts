import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import { UserRouter } from './routers/user-router';
import { TransactionRouter } from './routers/transaction-router';
import { AccountRouter } from './routers/account-router';
import { Pool } from 'pg';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';

// environment configuration
dotenv.config();

// database configuration
export const connectionPool: Pool = new Pool({
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    max: 5
});

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

// web server configuration
const app = express();
app.use(morgan('combined', {stream: logStream}));
app.use('/', express.json());
app.use(sessionMiddleware);
app.use(corsFilter);
app.use('/users', UserRouter);
app.use('/transactions', TransactionRouter);
app.use('/accounts', AccountRouter);

app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});
