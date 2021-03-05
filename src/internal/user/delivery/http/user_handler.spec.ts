/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
import ErrorMiddleware, {
    RouteErrorNotFound,
} from '@/cmd/server/middleware/errors';
import { ICreateUserDTO, IUpdateUserDTO } from '../../usecase/interface';

import UserRepositoryFake from '../../repository/fakes/user_repository_fake';
import UserRoutes from './user_routes';
import cors from 'cors';
import express from 'express';
import request from 'supertest';

function injectRoutes() {
    const app = express.Router();
    app.use(new UserRoutes(app, new UserRepositoryFake()).execute());
    return app;
}

function setupRouter() {
    const app: any = express();

    app.use(express.json()).use(cors());

    app.use('/user', injectRoutes());

    app.use(RouteErrorNotFound).use(ErrorMiddleware);

    return app;
}

describe('User Handler', () => {
    const fakeUser: ICreateUserDTO = {
        email: 'example@gmail.com',
        name: 'example',
        password: '12345678',
    } as any;

    const app = setupRouter();

    describe('CreateUser', () => {
        it('Should return 200 on success', async () => {
            const response: any = await request(app)
                .post('/user')
                .send(fakeUser);

            expect(response.body.user.name).toBe('example');
            expect(response.body.user.email).toBe('example@gmail.com');

            expect(response.status).toEqual(200);
        });
    });

    describe('FindUser', () => {
        it('Should return 200 on success', async () => {
            const response: any = await request(app)
                .post('/user')
                .send(fakeUser);

            const { id } = response.body.user;

            const userFounded: any = await request(app).get(`/user/${id}`);

            const { name, email } = userFounded.body.user;

            expect(name).toBe('example');
            expect(email).toBe('example@gmail.com');

            expect(userFounded.status).toEqual(200);
        });
    });

    describe('UpdateUser', () => {
        const fakeNewUser: IUpdateUserDTO = {
            email: 'example2@gmail.com',
            name: 'example2',
            password: '12345678',
        } as any;

        it('Should return 200 on success', async () => {
            const response: any = await request(app)
                .post('/user')
                .send(fakeUser);

            const { id } = response.body.user;

            const userFounded: any = await request(app)
                .put(`/user/${id}`)
                .send(fakeNewUser);

            expect(userFounded.status).toEqual(200);
        });
    });

    describe('DestroyUser', () => {
        it('Should return 200 on success', async () => {
            const response: any = await request(app)
                .post('/user')
                .send(fakeUser);

            const { id } = response.body.user;

            const user: any = await request(app).delete(`/user/${id}`);

            expect(user.status).toEqual(200);
        });
    });
});
