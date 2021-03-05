/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import 'express-async-errors';
import 'dotenv/config';

import ErrorMiddleware, {
    RouteErrorNotFound,
} from './server/middleware/errors';

import Postgres from '@/pkg/postgres';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './server/routes';

class Server {
    private server = express();

    private postgres = new Postgres();

    constructor() {
        this.postgres
            .connect()
            .then(async connection => {
                this.server
                    .use(express.json())
                    .use(morgan('dev'))
                    .use(cors())
                    .use(helmet())
                    .use(compression());

                this.server
                    .use('/api', routes)
                    .use(RouteErrorNotFound)
                    .use(ErrorMiddleware);
            })
            .catch(err => {
                console.log('database postgres failed', err);
            });
    }

    async start() {
        return new Promise(resolve => {
            const http = this.server.listen(3000, () =>
                resolve(http.address()),
            );
        });
    }
}

export default new Server();
