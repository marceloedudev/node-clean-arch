import BadRequestError from '@/pkg/http_errors/BadRequestError';
/* eslint-disable import/order */
import { IUserRepository } from './interface';
import { User } from '../repository/typeorm_user';

export class FindUserUseCase {
    private userRepository: IUserRepository;

    constructor(service: IUserRepository) {
        this.userRepository = service;
    }

    async execute(userID: number | string): Promise<User | undefined> {
        const user = await this.userRepository.findOne(userID);

        if (!user) {
            throw new BadRequestError('User not found');
        }

        return user;
    }
}
