import { UserEmail } from "./userEmail";
import { UserId } from "./userId";
import { UserPassword } from "./userPassword";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

interface UserProps {
  email: UserEmail;
  firstName: string;
  lastName: string;
  password: UserPassword;
  isActive: boolean;
  lastLogin?: Date;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UserId {
    return this._id;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get lastLogin(): Date | undefined {
    return this.props.lastLogin;
  }

  public activate(): void {
    this.props.isActive = true;
  }

  public deactivate(): void {
    this.props.isActive = false;
  }

  private constructor(props: UserProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id: UniqueEntityID): User {
    return new User(props, id);
  }
}
