import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class UserId extends UniqueEntityID {
  public static create(id?: string): UserId {
    return new UserId(id);
  }
}
