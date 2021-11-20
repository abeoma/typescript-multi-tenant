import { AppExceptionCode } from "./../../exceptions";

export class AppException extends Error {
  constructor(public code: AppExceptionCode, message?: string) {
    super(message);
    this.name = "AppException";
    Object.setPrototypeOf(this, AppException.prototype);
  }
}
