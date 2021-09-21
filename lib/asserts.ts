import { AssertionError } from "assert";

export function assertNever(_: never): void {
  // do nothing
}

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error();
  }
}

export function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string")
    throw new AssertionError({ message: "Not a string." });
}
