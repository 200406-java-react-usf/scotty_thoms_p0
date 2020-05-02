import { Request, Response } from 'express';
import { AuthError } from '../errors/errors';

export const adminGuard = (req: Request, resp: Response, next) => {

    if (!req.session.principal) {
        resp.status(401).json(new AuthError('No login detected. Please login.'));
    } else if (req.session.principal.role === 'Admin') {
        next();
    } else {
        resp.status(403).json(new AuthError());
    }
}
