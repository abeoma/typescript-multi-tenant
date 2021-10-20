import { Mapper } from "../../../infra/Mapper";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Tenant } from "../domain/tenant";

export class TenantMap implements Mapper<Tenant> {
  public static toDomain(raw: { id: string }): Tenant {
    return Tenant.create(new UniqueEntityID(raw.id));
  }

  public static toPersistence(tenant: Tenant): { id: string } {
    return { id: tenant.id.toString() };
  }
}
