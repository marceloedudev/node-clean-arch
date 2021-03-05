/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
import { IUpdateUserDTO, IUserRepository, IUserUseCaseExec } from './interface';

import BadRequestError from '@/pkg/http_errors/BadRequestError';
import { User } from '../repository/typeorm_user';
import { UserEmail } from '../domain/userEmail';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';

export class UpdateUserUseCase implements IUserUseCaseExec {
    private userRepository: IUserRepository;

    constructor(service: IUserRepository) {
        this.userRepository = service;
    }

    async execute(
        userID: string | number,
        { email, name, password }: IUpdateUserDTO,
    ): Promise<User> {
        const existsUser = await this.userRepository.findUserByID(userID);

        if (!existsUser) {
            throw new BadRequestError('User not found');
        }

        const user = {
            email: await UserEmail.create(email),
            name: await UserName.create(name),
            password: await UserPassword.create(password),
            updated_at: new Date(),
        } as any;

        return this.userRepository.update(userID, user);
    }
}
