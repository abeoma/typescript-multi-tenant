import { IDomainEvent as _IDomainEvent } from "./IDomainEvent";

export interface IHandle extends _IDomainEvent {
  setupSubscriptions(): void;
}
