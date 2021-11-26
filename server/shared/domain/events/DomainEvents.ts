/* eslint-disable no-magic-numbers */
import { AggregateRoot } from "../AggregateRoot";
import { IDomainEvent } from "./IDomainEvent";
import { UniqueEntityID } from "../UniqueEntityID";
import assert from "assert";

type EventHandler = (event: IDomainEvent) => void;

export class DomainEvents {
  private static handlersMap: {
    [key: string]: EventHandler[];
  } = {};

  private static markedAggregates: AggregateRoot<unknown>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch(
    aggregate: AggregateRoot<unknown>
  ): void {
    const aggregateFound = Boolean(this.findMarkedAggregateByID(aggregate.id));

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents(
    aggregate: AggregateRoot<unknown>
  ): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event)
    );
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<unknown>
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID
  ): AggregateRoot<unknown> | null {
    const founds: AggregateRoot<unknown>[] = [];
    for (const aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        founds.push(aggregate);
      }
    }

    if (founds.length === 0) {
      return null;
    }

    assert(founds.length === 1);
    return founds[0];
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (!(eventClassName in this.handlersMap)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (eventClassName in this.handlersMap) {
      const handlers = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}
