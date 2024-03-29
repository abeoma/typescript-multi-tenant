export const switchMap = <
  Type extends string,
  Value extends { type: Type },
  R
>(valueMap: { [Key in Type]: (m: Value & { type: Key }) => R }) => {
  return (v: Value): R => {
    return valueMap[v.type](v);
  };
};
