import 'dotenv/config';

const database = {
  development: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Dangkhoavu@1993',
    database: 'invoiceapp',
    entities: ['dist/**/*.model.js'],
    synchronize: true,
    uuidExtension: 'pgcrypto',
  },
  test: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORK,
    database: process.env.POSTGRES_DB,
    entities: ['src/**/*.model.ts'],
    synchronize: true,
    dropSchema: true,
    migrationsRun: false,
    migration: ['src/database/migrations/*.ts'],
    cli: {
      migrationDir: 'src/database/migrations',
    },
    keepConnectionAlive: true,
    uuidExtension: 'pgcrypto',
  },
};

export const databaseConfig = () => ({ ...database[process.env.NODE_ENV] });
