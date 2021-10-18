import { Guard } from "../../../shared/core/Guard";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ValueObject } from "../../../shared/domain/ValueObject";

type TenantIdProps = {
  value: UniqueEntityID;
};

export class TenantId extends ValueObject<TenantIdProps> {
  public static pattern = /^[a-z0-9_-]{3,20}$/;

  get value(): UniqueEntityID {
    return this.props.value;
  }

  private constructor(props: TenantIdProps) {
    super(props);
  }

  public static create(id: UniqueEntityID): TenantId {
    const result = Guard.againstRegex(this.pattern, id.toString());
    if (!result.succeeded) {
      throw new Error(result.message);
    }
    return new TenantId({ value: id });
  }
}
