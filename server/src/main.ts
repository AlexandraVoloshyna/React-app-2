import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
const client = process.env.CLIENT_API || "http://localhost:5173";
const port = parseInt(process.env.PORT) || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: [client],
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    credentials: true,
  });
  await app.listen(port, "0.0.0.0");
}
bootstrap();
