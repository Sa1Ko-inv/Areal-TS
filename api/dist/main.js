"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const PORT = process.env.PORT ?? 7000;
console.log(PORT);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map