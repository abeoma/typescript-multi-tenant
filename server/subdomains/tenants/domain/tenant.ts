import { TenantId } from "./tenantId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Entity } from "../../../shared/domain/Entity";

export class Tenant extends Entity<null> {
  get id(): TenantId {
    return TenantId.create(this._id);
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: UniqueEntityID): Tenant {
    const tenant = new Tenant(id);
    return tenant;
  }
}
