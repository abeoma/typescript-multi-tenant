import { AppException } from "../../../shared/core/AppException";
import { ValueObject } from "../../../shared/domain/ValueObject";

export type UserEmailProps = {
  value: string;
};

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private static isValidEmail(email: string): boolean {
    /*
     *Html5 'input[type=email]' validation
     *https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
     */
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/u;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): UserEmail {
    if (!this.isValidEmail(email)) {
      throw new AppException("invalid_email_format", email);
    }
    return new UserEmail({ value: this.format(email) });
  }
}
