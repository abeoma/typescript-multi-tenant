import { Mapper } from "../../../infra/Mapper";
import { User } from "../domain/user";
import { UserPassword } from "../domain/userPassword";
import { UserEmail } from "../domain/userEmail";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { UserDTO } from "../dtos/userDTO";

type Props = {
  id: string;
  email: string;
  // password: string;
  // passwordSalt: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
};

export class UserMap implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      id: user.id.toString(),
      email: user.email.value,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };
  }

  public static toDomain(raw: Props): User {
    const password = UserPassword.create({
      // value: raw.password,
      // salt: raw.passwordSalt,
      value: "",
      salt: "",
      hashed: true,
    });

    const userEmail = UserEmail.create(raw.email);

    return User.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        isActive: raw.isActive,
        password: password,
        email: userEmail,
      },
      new UniqueEntityID(raw.id)
    );
  }

  public static toPersistence(user: User): Props {
    return {
      id: user.id.toString(),
      email: user.email.value,
      firstName: user.firstName,
      lastName: user.lastName,
      // password: user.password.value,
      // passwordSalt: user.password.salt,
      isActive: user.isActive,
    };
  }
}
