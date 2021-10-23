import { ApplicationServiceException } from "./ApplicationServiceException";

export class UnexpectedException extends ApplicationServiceException {
  public constructor(err: unknown) {
    super("An unexpected error occurred.", err);
    console.log("[AppError]: An unexpected error occurred");

    console.error(err);
  }

  public static create(err: unknown): UnexpectedException {
    return new UnexpectedException(err);
  }
}
