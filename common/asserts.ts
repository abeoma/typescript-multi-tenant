class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

type AssertNever = (val: unknown) => asserts val is never;
export const assertNever: AssertNever = (_) => {
  // Do nothing
};

type AssertIsDefined = <T>(val: T) => asserts val is NonNullable<T>;
export const assertIsDefined: AssertIsDefined = (val) => {
  if (typeof val === "undefined" || val === null) {
    throw new Error();
  }
};

type AssertIsString = (val: unknown) => asserts val is string;
export const assertIsString: AssertIsString = (val) => {
  if (typeof val !== "string") throw new AssertionError("Not a string.");
};

type AssertIsBoolean = (val: unknown) => asserts val is boolean;
export const assertIsBoolean: AssertIsBoolean = (val) => {
  if (typeof val !== "boolean") throw new AssertionError("Not a boolean.");
};

type AssertIsObject = (
  val: unknown
) => asserts val is { [key: string]: unknown };
export const assertIsObject: AssertIsObject = (val) => {
  if (typeof val !== "object") throw new AssertionError("Not a object.");
};
