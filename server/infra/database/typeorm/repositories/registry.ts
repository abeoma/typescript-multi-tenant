import { Connection, EntityManager } from "typeorm";
import { IRegistry } from "../../interfaces/registry";
import { UserRepository } from "./user";

export class TypeOrmRegistry implements IRegistry {
  private conn: Connection;
  constructor(conn: Connection) {
    this.conn = conn;
  }

  public async withTransaction(
    handler: (m: EntityManager) => void
  ): Promise<void> {
    this.conn.transaction(async (transactionalEntityManager) => {
      handler(transactionalEntityManager);
    });
  }

  public userRepository(): UserRepository {
    return new UserRepository(this.conn);
  }
}
