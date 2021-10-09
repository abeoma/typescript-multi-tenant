import { IDomainEvent as _IDomainEvent } from "./IDomainEvent";

export interface IHandle<_IDomainEvent> {
  setupSubscriptions(): void;
}
