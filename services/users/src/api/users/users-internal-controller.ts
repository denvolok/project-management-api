import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UsersService } from "./users.service";

@Controller()
export class UsersInternalController {
  constructor(private usersService: UsersService) {}

  @MessagePattern({ cmd: "fetchByJwtToken" })
  public async fetchByJwtToken(data: Record<string, string>): Promise<{ jwtToken: string }> {
    console.log(data);
    return { jwtToken: "1" };
  }
}
