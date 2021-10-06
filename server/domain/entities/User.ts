import { UserModel } from "./../../models/tenant/User";

export class UserEntity {
  private _model: UserModel;

  constructor(model: UserModel) {
    this._model = model;
  }

  get id(): string {
    return this._model.id;
  }

  get email(): string {
    return this._model.email;
  }

  get firstName(): string {
    return this._model.firstName;
  }

  get lastName(): string {
    return this._model.lastName;
  }

  get isActive(): boolean {
    return this._model.isActive;
  }
}
