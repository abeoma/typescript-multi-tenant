import { Connection, EntityManager } from "typeorm";
import { Registry } from "../../interfaces/registry";
import { UserRepositoryImpl } from "./user";

export class TypeOrmRegistry implements Registry {
  private conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  public async withTransaction(
    handler: (m: EntityManager) => void
  ): Promise<void> {
    await this.conn.transaction(async (transactionalEntityManager) => {
      await handler(transactionalEntityManager);
    });
  }

  public userRepository(): UserRepositoryImpl {
    return new UserRepositoryImpl(this.conn);
  }
}
