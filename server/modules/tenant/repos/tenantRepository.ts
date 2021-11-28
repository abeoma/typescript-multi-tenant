import { Tenant } from "../domain/tenant";
import { TenantId } from "../domain/tenantId";

export interface ITenantRepository {
  exists(tenantId: TenantId): Promise<boolean>;
  fetchById(id: TenantId): Promise<Tenant>;
  fetchAll(): Promise<Tenant[]>;
  save(tenant: Tenant): Promise<void>;
}
