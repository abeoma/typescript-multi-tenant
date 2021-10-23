interface IApplicationServiceException {
  message: string;
  error?: unknown;
}

export class ApplicationServiceException
  implements IApplicationServiceException
{
  public readonly message: string;
  public readonly error?: unknown;

  constructor(message: string, error?: unknown) {
    this.message = message;
    this.error = error;
  }
}
