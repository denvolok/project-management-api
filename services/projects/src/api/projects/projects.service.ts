import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class ProjectsService {
  constructor(@Inject("USERS_SERVICE") private client: ClientProxy) {}

  public async send(): Promise<Observable<number[]>> {
    return this.client.send({ cmd: "fetchByJwtToken" }, [1, 2, 3]);
  }
}
