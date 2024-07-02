import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { UsersModule } from "./api/users/users.module";
import { OrganizationsModule } from "./api/organizations/organizations.module";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import { PrismaModule } from "./services/prisma.module";

@Module({
  imports: [PrismaModule, OrganizationsModule, UsersModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
