interface ValueObjectProps {
  [index: string]: unknown;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;

  constructor(props: T) {
    const baseProps: T = {
      ...props,
    };

    this.props = baseProps;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || typeof vo === "undefined") {
      return false;
    }
    if (typeof vo.props === "undefined") {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
