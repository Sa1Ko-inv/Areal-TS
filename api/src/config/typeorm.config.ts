import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'

export async function getTypeOrmConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> {
	return {
		type: 'postgres',
		username: configService.getOrThrow('POSTGRES_USER'),
		password: configService.getOrThrow('POSTGRES_PASSWORD'),
		host: configService.getOrThrow('POSTGRES_HOST'),
		port: configService.getOrThrow('POSTGRES_PORT'),
		database: configService.getOrThrow('POSTGRES_DATABASE'),
		synchronize: false,
	}
}