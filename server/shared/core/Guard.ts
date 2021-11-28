export type IGuardResult =
  | {
      succeeded: true;
    }
  | {
      succeeded: false;
      message: string;
    };

export interface IGuardArgument {
  argument: unknown;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static greaterThan(
    minValue: number,
    actualValue: number
  ): IGuardResult {
    return actualValue > minValue
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Number given {${actualValue}} is not greater than {${minValue}}`,
        };
  }

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    return text.length >= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is not at least ${numChars} chars.`,
        };
  }

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    return text.length <= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is greater than ${numChars} chars.`,
        };
  }

  public static againstRegex(pattern: RegExp, text: string): IGuardResult {
    return pattern.test(text)
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text should match "${pattern}", but ${text}.`,
        };
  }

  public static againstNullOrUndefined(
    argument: unknown,
    argumentName: string
  ): IGuardResult {
    if (argument === null || typeof argument === "undefined") {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    }
    return { succeeded: true };
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static isOneOf(
    value: unknown,
    validValues: unknown[],
    argumentName: string
  ): IGuardResult {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true };
    }
    return {
      succeeded: false,
      message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
        validValues
      )}. Got "${value}".`,
    };
  }

  public static inRange({
    num,
    min,
    max,
    argumentName,
  }: {
    num: number;
    min: number;
    max: number;
    argumentName: string;
  }): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    }
    return { succeeded: true };
  }

  public static allInRange({
    numbers,
    min,
    max,
    argumentName,
  }: {
    numbers: number[];
    min: number;
    max: number;
    argumentName: string;
  }): IGuardResult {
    let failingResult: IGuardResult | null = null;
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange({ num, min, max, argumentName });
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    }
    return { succeeded: true };
  }
}
