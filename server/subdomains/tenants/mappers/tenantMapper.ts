import { Mapper } from "../../../infra/Mapper";
import { Tenant } from "../domain/tenant";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class TenantMap implements Mapper<Tenant> {
  public static toDomain(raw: { id: string }): Tenant {
    return Tenant.create(new UniqueEntityID(raw.id));
  }

  public static toPersistence(tenant: Tenant): { id: string } {
    return { id: tenant.id.toString() };
  }
}
