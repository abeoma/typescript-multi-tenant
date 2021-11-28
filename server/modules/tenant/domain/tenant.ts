import { Entity } from "../../../shared/domain/Entity";
import { TenantId } from "./tenantId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class Tenant extends Entity<null> {
  get id(): TenantId {
    // eslint-disable-next-line no-underscore-dangle
    return this._id;
  }

  private constructor(id: UniqueEntityID) {
    super(null, id);
  }

  public static create(id: UniqueEntityID): Tenant {
    return new Tenant(id);
  }
}
