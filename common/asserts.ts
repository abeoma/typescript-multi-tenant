class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

export const assertNever = (_: never): void => {
  // Do nothing
};

export const assertIsDefined = <T>(val: T): asserts val is NonNullable<T> => {
  if (typeof val === "undefined" || val === null) {
    throw new Error();
  }
};

export const assertIsString = (val: unknown): asserts val is string => {
  if (typeof val !== "string") throw new AssertionError("Not a string.");
};

export const assertIsBoolean = (val: unknown): asserts val is boolean => {
  if (typeof val !== "boolean") throw new AssertionError("Not a boolean.");
};

export const assertIsObject = (
  val: unknown
): asserts val is { [key: string]: unknown } => {
  if (typeof val !== "object") throw new AssertionError("Not a object.");
};
