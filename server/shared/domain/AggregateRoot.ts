/* eslint-disable no-underscore-dangle */
import { DomainEvents } from "./events/DomainEvents";
import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
import { UniqueEntityID } from "./UniqueEntityID";
import assert from "assert";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    /*
     * Add this aggregate instance to the domain event's list of aggregates who's
     * events it eventually needs to dispatch.
     */
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    // eslint-disable-next-line no-magic-numbers
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    assert(thisClass && domainEventClass);
    // eslint-disable-next-line no-console
    console.info(
      "[Domain Event Created]:",
      thisClass.constructor.name,
      "==>",
      domainEventClass.constructor.name
    );
  }
}
