import { Connection } from "typeorm";
import { ITenantRepository } from "../../../../subdomains/tenants/repos/tenantRepository";
import { Tenant } from "../../../../subdomains/tenants/domain/tenant";
import { TenantMap } from "./../../../../subdomains/tenants/mappers/tenantMapper";
import { TenantRepository } from "./tenantRepository";

export class AdminRegistry {
  private repo: ITenantRepository;

  constructor(conn: Connection) {
    this.repo = new TenantRepository(conn);
  }

  async createTenant(id: string): Promise<void> {
    const tenant = TenantMap.toDomain({ id });
    if (await this.repo.exists(tenant.id)) {
      throw new Error(`TenantId "${id}" already exists.`);
    }
    await this.repo.save(tenant);
  }

  fetchById(id: string): Promise<Tenant> {
    const tenant = TenantMap.toDomain({ id });
    return this.repo.fetchById(tenant.id);
  }

  fetchAll(): Promise<Tenant[]> {
    return this.repo.fetchAll();
  }
}
