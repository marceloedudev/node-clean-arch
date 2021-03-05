/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateUserDTO, IUserUseCase } from './interface';

import HttpException from '@/pkg/http_errors/HttpException';
import UserRepositoryFake from '../repository/fakes/user_repository_fake';
import UserUseCase from './UserUsecase';

describe('DestroyUser', () => {
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

    it('Should be able to delete user', async () => {
        const newUser: any = await userService.createUser(fakeUser);

        await userService.destroyUser(newUser.id);

        const checkUser: any = userService.findUserByID(newUser.id);

        await expect(checkUser).rejects.toBeInstanceOf(HttpException);
    });
});
