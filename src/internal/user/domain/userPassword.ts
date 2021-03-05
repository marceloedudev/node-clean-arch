import BadRequestError from '@/pkg/http_errors/BadRequestError';
import bcrypt from 'bcryptjs';

export class UserPassword {
    public static async generateHashPassword(
        password: string,
    ): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public static checkPassword(
        password: string,
        passwordHash: string,
    ): boolean {
        return !!bcrypt.compare(password, passwordHash);
    }

    public static async create(password: string): Promise<string> {
        if (!password || password === '') {
            throw new BadRequestError('Field password is required');
        }

        if (password.length < 8 || password.length > 64) {
            throw new BadRequestError(
                'Password cannot be less than 8 or greater than 64',
            );
        }

        return this.generateHashPassword(password);
    }
}
