import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseConnectionService implements OnModuleInit {
	private readonly logger = new Logger(DatabaseConnectionService.name);

	constructor(private readonly sequelize: Sequelize) {}

	async onModuleInit() {
		try {
			await this.sequelize.authenticate();
			this.logger.log('Подключение к базе данных успешно установлено.');
		} catch (error) {
			this.logger.error('Невозможно подключиться к базе данных:', error);
			// Можно завершить процесс, если соединение критично
			process.exit(1);
		}
	}
}
