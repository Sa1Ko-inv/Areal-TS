import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as process from 'node:process'

dotenv.config({ path: '../.env' });

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: String(process.env.POSTGRES_PASSWORD),
	database: String(process.env.POSTGRES_DATABASE),
	synchronize: false,
	logging: false,
	entities: ['src/**/*.entity.ts'],
	migrations: ['./migrations/*.ts'],
	migrationsTableName: 'custom_migration_table',
});
