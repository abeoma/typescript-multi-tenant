interface IUseCaseException {
  message: string;
  error?: unknown;
}

export abstract class UseCaseException implements IUseCaseException {
  public readonly message: string;
  public readonly error?: unknown;

  constructor(message: string, error?: unknown) {
    this.message = message;
    this.error = error;
  }
}
