import { TenantModel } from "./../../models/admin/Tenant";
export class TenantEntity {
  private _model: TenantModel;

  constructor(model: TenantModel) {
    this._model = model;
  }

  get id(): string {
    return this._model.id;
  }

  get createdAt(): Date {
    return this._model.createdAt;
  }
}
