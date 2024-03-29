import { AppException } from "../core/AppException";
import { Guard } from "../core/Guard";
import { Identifier } from "./Identifier";
import { v4 as uuidv4 } from "uuid";

export class UniqueEntityID extends Identifier<string> {
  constructor(id?: string, pattern = /^[a-zA-Z0-9_-]{4,64}$/u) {
    super(id || uuidv4());
    this.validate(pattern);
  }

  private validate(r: RegExp) {
    const result = Guard.againstRegex(r, this.toString());
    if (!result.succeeded) {
      throw new AppException("invalid_id_format", result.message);
    }
  }
}
