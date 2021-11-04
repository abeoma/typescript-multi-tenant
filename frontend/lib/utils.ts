import { cloneElement, ReactElement } from "react";

export function addIndexKey(componentList: ReactElement[]) {
  return componentList.map((v, i) => cloneElement(v, { key: i }));
}

export function IsJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
