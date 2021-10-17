import { User } from "../user";
import { UserEmail } from "../userEmail";
import { UserId } from "../userId";
import { UserPassword } from "../userPassword";

export type UserFactoryProps = {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export class UserFactory {
  public static newUser(props: UserFactoryProps): User {
    const id = UserId.create(props.id);
    const email = UserEmail.create(props.email);
    const password = UserPassword.create({
      value: props.password,
      hashed: false,
    });
    return User.create(
      {
        email,
        password,
        firstName: props.firstName,
        lastName: props.lastName,
        isActive: true,
      },
      id
    );
  }
}
