import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { UserEmail } from "./userEmail";
import { UserId } from "./userId";
import { UserPassword } from "./userPassword";

interface UserProps {
  email: UserEmail;
  firstName: string;
  lastName: string;
  password: UserPassword;
  isActive: boolean;
  lastLogin?: Date;
}

export class User extends AggregateRoot<UserProps> {
  get _id(): UserId {
    // eslint-disable-next-line no-underscore-dangle
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

  public static create(props: UserProps, id: UniqueEntityID): User {
    return new User(props, id);
  }

  public setEmail(email: UserEmail): void {
    this.props.email = email;
  }

  public setName(firstName: string, lastName: string): void {
    this.props.firstName = firstName;
    this.props.lastName = lastName;
  }
}
