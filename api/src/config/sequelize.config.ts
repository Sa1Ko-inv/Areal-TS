import { ConfigService } from '@nestjs/config'
import type { SequelizeModuleOptions } from '@nestjs/sequelize'

export async function getSequelizeConfig(configService: ConfigService): Promise<SequelizeModuleOptions> {
	return {
		dialect: 'postgres',
		host: configService.getOrThrow('POSTGRES_HOST'),
		port: configService.getOrThrow('POSTGRES_PORT'),
		username: configService.getOrThrow('POSTGRES_USER'),
		password: configService.getOrThrow('POSTGRES_PASSWORD'),
		database: configService.getOrThrow('POSTGRES_DATABASE'),
	}
}