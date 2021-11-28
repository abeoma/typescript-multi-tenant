import { IUserRepository } from "../../../modules/user/repositories/user";

export interface IRegistry {
  withTransaction(handler: (transaction: unknown) => void): Promise<void>;
  userRepository(): IUserRepository;
}
