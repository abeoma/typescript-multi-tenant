import { IUserRepository } from "../../../subdomains/users/repositories/user";

export interface IRegistry {
  withTransaction(handler: (transaction: unknown) => void): Promise<void>;
  userRepository(): IUserRepository;
}
