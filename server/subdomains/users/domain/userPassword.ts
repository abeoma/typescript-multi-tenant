import { ValueObject } from "../../../shared/domain/ValueObject";
import { pbkdf2 } from "crypto";
import { v4 as uuidv4 } from "uuid";
import assert from "assert";

const config = {
  hashBytes: 32,
  iterations: 872791,
  digest: "sha512",
};

type UserPasswordProps = {
  value: string;
  salt?: string;
  hashed: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  public static minLength = 8;

  get value(): string {
    return this.props.value;
  }

  get salt(): string {
    assert(this.props.salt);
    return this.props.salt;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  public async comparePassword(plainText: string): Promise<boolean> {
    if (this.isAlreadyHashed()) {
      assert(this.props.salt);
      const hashed = await encrypt(plainText, this.props.salt);
      return hashed === this.props.value;
    }
    return this.props.value === plainText;
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  public genSalt(): string {
    assert(!this.props.salt);
    return uuidv4();
  }

  public static create({
    value,
    salt,
    hashed,
  }: UserPasswordProps): UserPassword {
    return new UserPassword({
      value,
      salt,
      hashed,
    });
  }
}

function encrypt(plainText: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(
      plainText,
      salt,
      config.iterations,
      config.hashBytes,
      config.digest,
      (err, hash) => {
        if (err) return reject(err);
        return resolve(hash.toString());
      }
    );
  });
}
