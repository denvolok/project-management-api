import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersExternalController {
  constructor(private usersService: UsersService) {}

  @Post("signin")
  public async signin(
    @Body() data: { email: string; password: string },
  ): Promise<{ jwtToken: string }> {
    return this.usersService.signIn(data);
  }
}
