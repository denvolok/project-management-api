import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { ENV } from "../../utils/env/env";
import { UsersInternalController } from "./users-internal-controller";
import { UsersExternalController } from "./users-external-controller";

@Module({
  imports: [JwtModule.register({ secret: ENV.JWT_SECRET })],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersInternalController, UsersExternalController],
})
export class UsersModule {}
