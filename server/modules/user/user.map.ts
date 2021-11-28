import { Mapper } from "../../infra/Mapper";
import { UniqueEntityID } from "../../shared/domain/UniqueEntityID";
import { User } from "./domain/user";
import { UserDTO } from "../../dtos";
import { UserEmail } from "./domain/userEmail";
import { UserPassword } from "./domain/userPassword";

type Props = {
  id: string;
  email: string;
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
        password,
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
      isActive: user.isActive,
    };
  }
}
