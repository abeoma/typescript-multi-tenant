import { TenantId } from "./tenantId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Entity } from "../../../shared/domain/Entity";

export class Tenant extends Entity<null> {
  get id(): TenantId {
    return this._id;
  }

  private constructor(id: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: UniqueEntityID): Tenant {
    return new Tenant(id);
  }
}
