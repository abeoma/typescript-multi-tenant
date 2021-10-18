import { UserFactory, UserFactoryProps } from "./../domain/factories/user";
import { IUserRepository } from "./../repositories/user";
import * as AppError from "../../../shared/core/AppException";
import { UseCase } from "../../../shared/core/UseCase";
import { EmailAlreadyExistsException } from "./exceptions";

type Props = UserFactoryProps;

export class CreateUserUseCase implements UseCase<Props, Promise<void>> {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async execute(data: Props): Promise<void> {
    const user = UserFactory.newUser(data);
    try {
      const found = await this.userRepo.fetchByEmail(user.email);
      if (found) {
        throw new EmailAlreadyExistsException(user.email.value);
      }
      await this.userRepo.save(user);
    } catch (err) {
      throw new AppError.UnexpectedException(err);
    }
  }
}
