/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    ICreateUserDTO,
    IUpdateUserDTO,
    IUserRepository,
} from '../usecase/interface';

import { Repository } from 'typeorm';
import { User } from './typeorm_user';

export class UserRepository implements IUserRepository {
    private db: Repository<User>;

    constructor(models: Repository<User> | any) {
        this.db = models;
    }

    public async findUserByID(
        userID: number | string,
    ): Promise<User | undefined> {
        return this.db.findOne(userID);
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        return this.db.save(this.db.create(userData));
    }

    public async update(
        userID: string | number,
        userData: IUpdateUserDTO,
    ): Promise<User> {
        const res = this.db.update(userID, userData);
        return res as any;
    }

    public async destroy(userID: number | string): Promise<any> {
        return this.db.delete(userID);
    }
}
