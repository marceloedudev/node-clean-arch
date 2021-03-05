/* eslint-disable import/order */
import { IUserRepository } from '../../usecase/interface';
import UserHandler from './user_handler';
import express from 'express';

class UserRoutes {
    private router;

    private repository;

    constructor(router: express.Router, repository?: IUserRepository) {
        this.router = router;
        this.repository = repository;
    }

    execute() {
        const controller = new UserHandler();
        this.router.post('/', controller.createUser(this.repository));
        this.router.get('/:id', controller.findUser(this.repository));
        this.router.put('/:id', controller.updateUser(this.repository));
        this.router.delete('/:id', controller.destroyUser(this.repository));
        return this.router;
    }
}

export default UserRoutes;
