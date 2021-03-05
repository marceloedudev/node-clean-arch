import HttpException from '@/pkg/http_errors/HttpException';
import { UserEmail } from './userEmail';

describe('userEmail', () => {
    test('Should be return email', async () => {
        const emailAddress = 'example@gmail.com';
        const newEmail = await UserEmail.create(emailAddress);

        expect(newEmail).toBe(emailAddress);
    });

    test('Should throw if empty email', async () => {
        const emailAddress = '';
        const newEmail = UserEmail.create(emailAddress);

        await expect(newEmail).rejects.toBeInstanceOf(HttpException);
    });

    test('Should throw if null email', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const emailAddress: any = null;
        const newEmail = UserEmail.create(emailAddress);

        await expect(newEmail).rejects.toBeInstanceOf(HttpException);
    });

    test('Should throw if invalid email', async () => {
        const emailAddress = 'example';
        const newEmail = UserEmail.create(emailAddress);

        await expect(newEmail).rejects.toBeInstanceOf(HttpException);
    });
});
