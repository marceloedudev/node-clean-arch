import { ICreateUserDTO, IUserRepository, IUserUseCaseExec } from './interface';

import { User } from '../repository/typeorm_user';
import { UserEmail } from '../domain/userEmail';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';

export class CreateUserUseCase implements IUserUseCaseExec {
    private userRepository: IUserRepository;

    constructor(service: IUserRepository) {
        this.userRepository = service;
    }

    async execute({
        email,
        name,
        password,
    }: ICreateUserDTO): Promise<User | undefined> {
        const user = {
            email: await UserEmail.create(email),
            name: await UserName.create(name),
            password: await UserPassword.create(password),
            created_at: new Date(),
            updated_at: new Date(),
        };

        return this.userRepository.create(user);
    }
}
