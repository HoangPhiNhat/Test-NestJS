"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    const runPort = await app.listen(3000);
    if (runPort) {
        console.log(`Running port ${3000}`);
    }
    else {
        console.log('error');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map