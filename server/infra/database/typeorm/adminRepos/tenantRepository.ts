import { Connection, Repository } from "typeorm";
import { ITenantRepository } from "../../../../modules/tenant/repos/tenantRepository";
import { Tenant } from "../../../../modules/tenant/domain/tenant";
import { TenantId } from "../../../../modules/tenant/domain/tenantId";
import { TenantMap } from "../../../../modules/tenant/mappers/tenantMapper";
import { TenantModel } from "../models/admin/tenant";

export class TenantRepository implements ITenantRepository {
  private repo: Repository<TenantModel>;

  constructor(conn: Connection) {
    this.repo = conn.getRepository(TenantModel);
  }

  async exists(id: TenantId): Promise<boolean> {
    const count = await this.repo.count({ id: id.toString() });
    // eslint-disable-next-line no-magic-numbers
    return count === 1;
  }

  async fetchById(id: TenantId): Promise<Tenant> {
    const model = await this.repo.findOne(id.toString());
    if (!model) throw new Error("Tenant not found.");
    return TenantMap.toDomain(model);
  }

  async fetchAll(): Promise<Tenant[]> {
    const models = await this.repo.find();
    return models.map((model) => TenantMap.toDomain(model));
  }

  async save(tenant: Tenant): Promise<void> {
    const data = TenantMap.toPersistence(tenant);
    const model = this.repo.create(data);
    await this.repo.save(model);
  }
}
