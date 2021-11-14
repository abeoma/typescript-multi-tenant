import { UserModel } from "../infra/database/typeorm/models/tenant/user";
import { Connection } from "typeorm";
import { range } from "../lib/helpers";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";

export class SeedImporter {
  private conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  public async runTenant(): Promise<void> {
    await this.importUsers();
  }

  private async importUsers() {
    const users = range(50).map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }));
    await this.conn
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values(
        users.map((u) => ({
          id: uuidv4(),
          email: `${u.firstName}.${u.lastName}@example.com`,
          password: "password",
          isActive: true,
          ...u,
        }))
      )
      .execute();
  }
}
