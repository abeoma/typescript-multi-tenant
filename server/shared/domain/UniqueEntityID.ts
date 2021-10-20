import { v4 as uuidv4 } from "uuid";
import { Guard } from "../core/Guard";
import { Identifier } from "./Identifier";

export class UniqueEntityID extends Identifier<string> {
  constructor(id?: string, pattern = /^[a-zA-Z0-9_-]{4,64}$/) {
    super(id ? id : uuidv4());
    this.validate(pattern);
  }

  private validate(r: RegExp) {
    const result = Guard.againstRegex(r, this.toString());
    if (!result.succeeded) {
      throw new Error(result.message);
    }
  }
}
