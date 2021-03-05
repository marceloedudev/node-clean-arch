/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateUserDTO, IUserUseCase } from './interface';

import UserRepositoryFake from '../repository/fakes/user_repository_fake';
import UserUseCase from './UserUsecase';

describe('UpdateUser', () => {
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

    it('Should be able to update user', async () => {
        const newUser: any = await userService.createUser(fakeUser);

        const updateData = {
            name: 'name',
            email: 'email@gmail.com',
            password: '12345678',
        };

        const user = await userService.updateUser(
            newUser.id,
            updateData as any,
        );

        expect(user.name).toBe('name');
    });
});
