import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseService } from './config/database.service'
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './config/database.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../.env',
		}),
		DatabaseModule, // глобальный доступ к БД
		EmployeeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
