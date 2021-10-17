import { Connection, Repository } from "typeorm";
import { TenantModel } from "../models/admin/tenant";
import { ITenantRepository } from "../../../../subdomains/tenants/repos/tenantRepository";
import { TenantId } from "../../../../subdomains/tenants/domain/tenantId";
import { Tenant } from "../../../../subdomains/tenants/domain/tenant";
import { TenantMap } from "../../../../subdomains/tenants/mappers/tenantMapper";

export class TenantRepository implements ITenantRepository {
  private repo: Repository<TenantModel>;

  constructor(conn: Connection) {
    this.repo = conn.getRepository(TenantModel);
  }

  async exists(id: TenantId): Promise<boolean> {
    const count = await this.repo.count({ id: id.value.toString() });
    return count === 1;
  }

  async fetchById(id: TenantId): Promise<Tenant> {
    const model = await this.repo.findOne(id.value.toString());
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
    this.repo.save(model);
  }
}
