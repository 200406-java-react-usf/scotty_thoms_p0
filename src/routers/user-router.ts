import express, { response } from 'express';
import AppConfig from '../config/app';
import { adminGuard } from '../middleware/auth-middlware';

export const UserRouter = express.Router();

const userService = AppConfig.userService;

/**
 * Used to get all users in database
 * Admin role required.
 */
UserRouter.get('', adminGuard, async (req, resp) => {
    try{

        let payload = await userService.getAllUsers();
        resp.status(200).json(payload);
    } catch (e){
        resp.status(404).json(e);
    }
});

/**
 * Used to get user with specific id
 */
UserRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; //the plus sign is to type coerce id into a number
    try { 
        let payload = await userService.getUserById(id);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(404).json(e);
    }
});

/**
 * used to add a new user
 */
UserRouter.post('', async (req, resp) => {
    
    try {
        let newUser = await userService.addNewUser(req.body);
        return resp.status(201).json(newUser);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
});

/**
 * used to update a user that already exists in database
 */
UserRouter.put('', async (req,resp) => {
    try {
        let updatedUser = await userService.updateUser(req.body);
        return resp.status(202).json(updatedUser);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
});

/**
 * used to delte user
 * Admin role required.
 */
UserRouter.delete('', adminGuard, async (req,resp) => {
    try {
        let userToBeDeleted = await userService.deleteUser(req.body);
        return resp.status(202).json(userToBeDeleted);
    } catch (e) {
        return resp.status(e.statusCode || 500).json(e);
    }
})