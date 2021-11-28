/* eslint-disable no-underscore-dangle */
import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;

  public readonly props: T;

  static isEntity(v: unknown): v is Entity<unknown> {
    return v instanceof Entity;
  }

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || typeof object === "undefined") {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
