/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ICreateUserDTO,
    IUpdateUserDTO,
    IUserRepository,
    IUserUseCase,
} from './interface';

import { CreateUserUseCase } from './CreateUser';
import { DestroyUserUseCase } from './DestroyUser';
import { FindUserUseCase } from './FindUserByID';
import { UpdateUserUseCase } from './UpdateUser';
import { User } from '../repository/typeorm_user';

class UserUseCase implements IUserUseCase {
    private repository: IUserRepository;

    constructor(service: IUserRepository) {
        this.repository = service;
    }

    createUser(input: ICreateUserDTO): Promise<User | undefined> {
        return new CreateUserUseCase(this.repository).execute(input);
    }

    findUserByID(userID: number | string): Promise<User | undefined> {
        return new FindUserUseCase(this.repository).execute(userID);
    }

    updateUser(
        userID: string | number,
        userData: IUpdateUserDTO,
    ): Promise<User> {
        return new UpdateUserUseCase(this.repository).execute(userID, userData);
    }

    destroyUser(userID: number | string): Promise<any> {
        return new DestroyUserUseCase(this.repository).execute(userID);
    }
}

export default UserUseCase;
