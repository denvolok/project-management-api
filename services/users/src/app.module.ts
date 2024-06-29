import { Module } from "@nestjs/common";
import { UsersModule } from "./api/users/users.module";
import { OrganizationsModule } from "./api/organizations/organizations.module";

@Module({
  imports: [OrganizationsModule, UsersModule],
})
export class AppModule {}
