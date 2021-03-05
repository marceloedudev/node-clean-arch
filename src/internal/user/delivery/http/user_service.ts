/* eslint-disable import/order */
import { IUserRepository } from '../../usecase/interface';
import { User } from '../../repository/typeorm_user';
import { UserRepository } from '../../repository/pg_user_repository';
import UserUseCase from '../../usecase/UserUsecase';
import { getRepository } from 'typeorm';

export function GetUserService(repository?: IUserRepository): UserUseCase {
    if (repository) {
        const service = new UserUseCase(repository);
        return service;
    }

    const userEntityDB = getRepository(User);
    const userRepository = new UserRepository(userEntityDB);
    const userService = new UserUseCase(userRepository);

    return userService;
}
