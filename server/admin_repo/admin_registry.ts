import { TenantModel } from "./../models/admin/Tenant";
import { Connection } from "typeorm";
import { TenantEntity } from "../domain/admin_entities/Tenant";
import assert from "assert";
import { ADMIN_DB_NAME } from "../defs";

export class AdminRegistry {
  private _conn: Connection;

  constructor(conn: Connection) {
    assert(conn.name === ADMIN_DB_NAME);
    this._conn = conn;
  }

  async create(id: string): Promise<void> {
    const repo = this._conn.getRepository(TenantModel);
    const tenant = repo.create({ id });
    await repo.save(tenant);
  }

  async fetchAll(): Promise<TenantEntity[]> {
    const repo = this._conn.getRepository(TenantModel);
    const models = await repo.createQueryBuilder().getMany();
    return models.map((m) => new TenantEntity(m));
  }
}
