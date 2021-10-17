import { Connection } from "typeorm";
import { UserModel } from "../infra/database/typeorm/models/tenant/User";
import { choice, range } from "../lib/helpers";
import { v4 as uuidv4 } from "uuid";

const firstNames = ["Hanako", "Yasuko", "Taro", "Jiro"];
const lastNames = ["Sato", "Tanaka", "Fujii", "Suzuki"];

export class SeedImporter {
  private conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  public async runTenant(): Promise<void> {
    await this.importUsers();
  }

  private async importUsers() {
    const users = range(10).map((i) => ({
      email: `test+${i}@sample.com`,
      firstName: choice(firstNames),
      lastName: choice(lastNames),
    }));
    await this.conn
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values(
        users.map((u) => ({
          id: uuidv4(),
          password: "password",
          isActive: true,
          ...u,
        }))
      )
      .execute();
  }
}
