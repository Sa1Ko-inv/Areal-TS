import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { getSequelizeConfig } from './config/sequelize.config'
import { DatabaseConnectionService } from './config/database-connection.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../.env',
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getSequelizeConfig,
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [AppService, DatabaseConnectionService],
})
export class AppModule {
}
