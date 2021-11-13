import { UserModel } from "../infra/database/typeorm/models/tenant/user";
import { Connection } from "typeorm";
import { choice, range } from "../lib/helpers";
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
    const users = range(50).map((_) => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      return {
        id: uuidv4(),
        email: `${firstName}.${lastName}@example.com`,
        password: "passwOrd",
        firstName,
        lastName,
        isActive: choice([true, true, true, false]),
      };
    });
    await this.conn
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values(users)
      .execute();
  }
}
