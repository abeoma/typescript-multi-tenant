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

export function assertIsBoolean(val: unknown): asserts val is boolean {
  if (typeof val !== "boolean")
    throw new AssertionError({ message: "Not a boolean." });
}

export function assertIsObject(
  val: unknown
): asserts val is { [key: string]: unknown } {
  if (typeof val !== "object")
    throw new AssertionError({ message: "Not a object." });
}
