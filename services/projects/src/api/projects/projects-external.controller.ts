import { Controller, forwardRef, Get, Inject } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsExternalController {
  constructor(
    @Inject(forwardRef(() => ProjectsService)) private projectsService: ProjectsService,
  ) {}

  @Get()
  public async fetchAll() {
    return this.projectsService.send();
  }
}
