import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  private logger = new Logger(this.constructor.name);

  private users = [
    {
      id: 1,
      organizationId: 1,
      role: "admin",
      email: "admin@example.com",
      password: "",
      firstName: "Admin",
    },
    {
      id: 2,
      organizationId: 1,
      role: "user",
      email: "user@example.com",
      password: "",
      firstName: "User",
    },
  ];

  constructor(private jwtService: JwtService) {}

  public async getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  public async signIn(data: { email: string; password: string }): Promise<{ jwtToken: string }> {
    const user = await this.getUserByEmail(data.email);

    if (user == null) {
      this.logger.debug("user not found");
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      this.logger.debug("incorrect password");
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
    };
    const jwtToken = await this.jwtService.signAsync(payload, { expiresIn: "1d" });

    return { jwtToken };
  }
}
