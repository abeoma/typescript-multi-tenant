import { Result } from "./Result";

export interface WithChanges {
  changes: Changes;
}

export class Changes {
  private changes: Result<unknown>[];

  constructor() {
    this.changes = [];
  }

  public addChange(result: Result<unknown>): void {
    this.changes.push(result);
  }

  public getChangeResult(): Result<unknown> {
    return Result.combine(this.changes);
  }
}
