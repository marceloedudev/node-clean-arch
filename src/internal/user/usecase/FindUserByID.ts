/* eslint-disable import/order */
import { IUserRepository, IUserUseCaseExec } from './interface';

import BadRequestError from '@/pkg/http_errors/BadRequestError';
import { User } from '../repository/typeorm_user';

export class FindUserUseCase implements IUserUseCaseExec {
    private userRepository: IUserRepository;

    constructor(service: IUserRepository) {
        this.userRepository = service;
    }

    async execute(userID: number | string): Promise<User | undefined> {
        const user = await this.userRepository.findUserByID(userID);

        if (!user) {
            throw new BadRequestError('User not found');
        }

        return user;
    }
}
