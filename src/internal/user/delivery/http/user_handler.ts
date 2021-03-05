/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
import {
    ICreateUserDTO,
    IUpdateUserDTO,
    IUserRepository,
} from '../../usecase/interface';
import { Request, Response } from 'express';

import { GetUserService } from './user_service';
import { IUserPresenter } from './user_presenter';
import { User } from '../../repository/typeorm_user';

class UserHandler {
    createUser(repository?: IUserRepository) {
        return async (req: Request, res: Response) => {
            const { email, name, password }: ICreateUserDTO = req.body;

            const user: User | any = await GetUserService(
                repository,
            ).createUser({
                email,
                name,
                password,
            });

            const result: IUserPresenter = {
                id: user.id,
                email: user.email,
                name: user.name,
            };

            return res.json({ user: result });
        };
    }

    findUser(repository?: IUserRepository) {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            const user: User | any = await GetUserService(
                repository,
            ).findUserByID(id);

            const result: IUserPresenter = {
                id: user.id,
                email: user.email,
                name: user.name,
            };

            return res.json({ user: result });
        };
    }

    updateUser(repository?: IUserRepository) {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            const { email, name, password }: IUpdateUserDTO = req.body;

            await GetUserService(repository).updateUser(id, {
                email,
                name,
                password,
            } as IUpdateUserDTO);

            return res.sendStatus(200);
        };
    }

    destroyUser(repository?: IUserRepository) {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            await GetUserService(repository).destroyUser(id);

            return res.sendStatus(200);
        };
    }
}

export default UserHandler;
