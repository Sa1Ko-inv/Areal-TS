import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common'
import { Pool, PoolClient, PoolConfig } from 'pg'
import { ConfigService } from '@nestjs/config'

//
// Сервис для работы с PostgreSQL через пул соединений
// Реализует жизненные циклы NestJS для управления подключением
//
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
	// Логгер для вывода информации о работе сервиса
	private readonly logger = new Logger(DatabaseService.name);
	// Пул соединений с PostgreSQL
	private pool: Pool;

	//
	// Конструктор сервиса
	// @param configService - сервис для работы с конфигурацией
	//
	constructor(private readonly configService: ConfigService) {
		const config: PoolConfig = {
			user: this.configService.get<string>('POSTGRES_USER'),       // Пользователь БД
			host: this.configService.get<string>('POSTGRES_HOST'),       // Хост БД
			database: this.configService.get<string>('POSTGRES_DATABASE'), // Имя БД
			password: this.configService.get<string>('POSTGRES_PASSWORD'), // Пароль
			port: this.configService.get<number>('POSTGRES_PORT') || 5432, // Порт (по умолчанию 5432)
		};

		// Инициализация пула соединений
		this.pool = new Pool(config);
	}
	//
	// Метод жизненного цикла NestJS - вызывается при инициализации модуля
	// Проверяет подключение к БД
	//
	async onModuleInit() {
		try {
			// Простой тестовый запрос для проверки подключения
			await this.pool.query('SELECT 1');
			this.logger.log('База данных успешно подключена');
		} catch (error) {
			this.logger.error('Ошибка подключения к базе данных', error.stack);
			throw error; // Прерываем запуск приложения при ошибке подключения
		}
	}
	//
	// Метод жизненного цикла NestJS - вызывается при завершении работы модуля
	// Закрывает все соединения с БД
	//
	async onModuleDestroy() {
		try {
			await this.pool.end();
			this.logger.log('Подключение к базе данных закрыто');
		} catch (error) {
			this.logger.error('Ошибка при закрытии подключений', error.stack);
		}
	}
	//
	//  Основной метод для выполнения SQL запросов
	//  @param sql - SQL запрос с параметрами $1, $2 и т.д.
	//  @param params - массив параметров для запроса
	//  @returns Promise с массивом результатов
	//
	async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
		try {
			// Выполнение запроса через пул соединений
			const result = await this.pool.query(sql, params);
			// Возвращаем только строки результата
			return result.rows;
		} catch (error) {
			this.logger.error(`Ошибка SQL запроса: ${sql}`, error.stack);
			// Пробрасываем ошибку дальше для обработки в вызывающем коде
			throw error;
		}
	}

	async getClient(): Promise<PoolClient> {
		return this.pool.connect()
	}
}