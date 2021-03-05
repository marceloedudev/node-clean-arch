/* eslint-disable import/order */
import { ICreateUserDTO, IUserUseCase } from './interface';

import HttpException from '@/pkg/http_errors/HttpException';
/* eslint-disable @typescript-eslint/no-explicit-any */
import UserRepositoryFake from '../repository/fakes/user_repository_fake';
import UserUseCase from './UserUsecase';

describe('FindUserByID', () => {
    const fakeUser: ICreateUserDTO = {
        email: 'example@gmail.com',
        name: 'example',
        password: '12345678',
    };

    let userService: IUserUseCase;

    beforeEach(() => {
        const userRepo = new UserRepositoryFake();
        userService = new UserUseCase(userRepo);
    });

    it('Should be able to find user', async () => {
        const newUser: any = await userService.createUser(fakeUser);

        const user: any = await userService.findUserByID(newUser.id);

        expect(user.id).toBe(newUser.id);
    });

    it('Should be throw if id invalid', async () => {
        const user = userService.findUserByID(10);

        await expect(user).rejects.toBeInstanceOf(HttpException);
    });
});
