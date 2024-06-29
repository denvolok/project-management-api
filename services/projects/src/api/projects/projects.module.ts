import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProjectsService } from "./projects.service";
import { ENV } from "../../utils/env/env";
import { ProjectsExternalController } from "./projects-external.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USERS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: ENV.USERS_SERVICE_HOST,
          port: ENV.USERS_SERVICE_PORT,
        },
      },
    ]),
  ],
  exports: [ProjectsService],
  providers: [ProjectsService],
  controllers: [ProjectsExternalController],
})
export class ProjectsModule {}
