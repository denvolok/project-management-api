import { Injectable } from "@nestjs/common";

@Injectable()
export class OrganizationsService {
  private organizations = [
    {
      id: 1,
      name: "Organization 1",
    },
    {
      id: 2,
      name: "Organization 2",
    },
  ];

  public async getOrganizationById(id: number) {
    return this.organizations.find((organization) => organization.id === id);
  }
}
