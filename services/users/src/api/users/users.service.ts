import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../services/prisma.service";

@Injectable()
export class UsersService {
  private logger = new Logger(this.constructor.name);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  public async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
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
