/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../repository/typeorm_user';

export interface ICreateUserDTO {
    email: string;
    name: string;
    password: string;
}

export interface IUpdateUserDTO extends User {
    email: string;
    name: string;
    password: string;
}

export interface IUserRepository {
    findOne(userID: number | string): Promise<User | undefined>;
    create(userData: ICreateUserDTO): Promise<User>;
    update(userID: string | number, userData: IUpdateUserDTO): Promise<User>;
    destroy(userID: number | string): Promise<any>;
}

export interface IUserUseCase {
    createUser(input: ICreateUserDTO): Promise<User | undefined>;
    findUserByID(userID: number | string): Promise<User | undefined>;
    updateUser(
        userID: string | number,
        userData: IUpdateUserDTO,
    ): Promise<User>;
    destroyUser(userID: number | string): Promise<any>;
}
