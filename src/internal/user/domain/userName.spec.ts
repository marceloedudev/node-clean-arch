import HttpException from '@/pkg/http_errors/HttpException';
import { UserName } from './userName';

describe('userName', () => {
    test('Should be return name', async () => {
        const userName = 'example@gmail.com';
        const newUserName = await UserName.create(userName);

        expect(newUserName).toBe(userName);
    });

    test('Should throw if empty name', async () => {
        const userName = '';
        const newUserName = UserName.create(userName);

        await expect(newUserName).rejects.toBeInstanceOf(HttpException);
    });

    test('Should throw if name longer than 60', async () => {
        const userName =
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        const newUserName = UserName.create(userName);

        await expect(newUserName).rejects.toBeInstanceOf(HttpException);
    });
});
