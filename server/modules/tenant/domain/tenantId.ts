import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class TenantId extends UniqueEntityID {
  static pattern = /^[a-z0-9_-]{3,20}$/u;

  public static create(id: string): TenantId {
    return new TenantId(id, this.pattern);
  }
}
