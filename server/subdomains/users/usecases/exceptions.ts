import { UseCaseException } from "../../../shared/core/UseCaseException";

export class EmailAlreadyExistsException extends UseCaseException {
  constructor(email: string) {
    super(`The email '${email}' associated for user already exists`);
  }
}

export class UserIdAlreadyExistsException extends UseCaseException {
  constructor(id: string) {
    super(`The userid '${id}' already exists`);
  }
}
