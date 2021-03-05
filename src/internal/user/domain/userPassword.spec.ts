import HttpException from '@/pkg/http_errors/HttpException';
import { UserPassword } from './userPassword';

describe('userPassword', () => {
    test('Should be return hash password', async () => {
        const userPassword = '1234567890';
        const newPassword = await UserPassword.create(userPassword);

        expect(newPassword).toBeTruthy();
    });

    test('Should throw if empty name', async () => {
        const userPassword = '';
        const newPassword = UserPassword.create(userPassword);

        await expect(newPassword).rejects.toBeInstanceOf(HttpException);
    });

    test('Should throw if name less than 8', async () => {
        const userPassword = 'pass';
        const newPassword = UserPassword.create(userPassword);

        await expect(newPassword).rejects.toBeInstanceOf(HttpException);
    });

    test('Should throw if name longer than 60', async () => {
        const userPassword =
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        const newPassword = UserPassword.create(userPassword);

        await expect(newPassword).rejects.toBeInstanceOf(HttpException);
    });
});
