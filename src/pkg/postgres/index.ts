import { Connection, createConnection } from 'typeorm';

class Postgres {
    async connect(): Promise<Connection> {
        return createConnection({
            type: 'postgres',
            host: process.env.POSTGRES_HOSTNAME,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DBNAME,
            synchronize: true,
            logging: false,
            entities: ['src/**/internal/**/repository/typeorm_*.ts'],
            migrations: ['src/migration/**/*.ts'],
            subscribers: ['src/subscriber/**/*.ts'],
            cli: {
                migrationsDir: 'src/migration',
                subscribersDir: 'src/subscriber',
            },
        });
    }
}

export default Postgres;
