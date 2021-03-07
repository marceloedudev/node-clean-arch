import { IUserRepository } from './interface';
import { User } from '../repository/typeorm_user';

export class DestroyUserUseCase {
    private userRepository: IUserRepository;

    constructor(service: IUserRepository) {
        this.userRepository = service;
    }

    async execute(userID: number | string): Promise<User | undefined> {
        return this.userRepository.destroy(userID);
    }
}
