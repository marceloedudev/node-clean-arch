import HttpException from '@/pkg/http_errors/HttpException';
import { ICreateUserDTO, IUserUseCase } from './interface';

import UserRepositoryFake from '../repository/fakes/user_repository_fake';
import UserUseCase from './UserUsecase';

describe('CreateUser', () => {
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

    it('Should be able to create a new user', async () => {
        const user = await userService.createUser(fakeUser);

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('password');
    });

    it('Should throw error if UserRepository.create throws', async () => {
        const user = userService.createUser({
            email: '',
            name: '',
            password: '',
        });

        await expect(user).rejects.toBeInstanceOf(HttpException);
    });
});
