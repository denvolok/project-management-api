import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ENV } from "./utils/env/env";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: ENV.PORT + 100,
    },
  });

  await app.startAllMicroservices();
  await app.listen(ENV.PORT);
}

bootstrap();
