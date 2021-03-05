/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ICreateUserDTO,
    IUpdateUserDTO,
    IUserRepository,
} from '../../usecase/interface';

import { User } from '../typeorm_user';

class UserRepositoryFake implements IUserRepository {
    private users: User[] = [];

    public async findUserByID(userID: number): Promise<User | undefined> {
        const userFounded = this.users.find(user => user.id == userID);
        return userFounded;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: this.users.length + 1 }, userData);

        this.users.push(user);

        return user;
    }

    public async update(
        userID: string | number,
        userData: IUpdateUserDTO,
    ): Promise<User> {
        // const findIndex = this.users.findIndex(user => user.id === userData.id);

        // this.users[findIndex] = userData;

        // return userData;

        this.users = <any>this.users.map(user => {
            if (user.id === userID) {
                return {
                    ...user,
                    ...userData,
                };
            }

            return user;
        });

        const findIndex = this.users.findIndex(user => user.id === userID);

        return this.users[findIndex];
    }

    public async destroy(userID: number): Promise<any> {
        this.users = this.users.filter(user => user.id !== userID);

        return this.users;
    }
}

export default UserRepositoryFake;
