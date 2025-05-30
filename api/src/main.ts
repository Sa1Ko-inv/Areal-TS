import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = process.env.PORT ?? 7000

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await app.listen(PORT, () => {
		console.log(`Сервер запущен на порту ${PORT}`)
	})
}

bootstrap()
