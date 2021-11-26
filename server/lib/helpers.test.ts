import { range } from "./helpers";

test("range", () => {
  // eslint-disable-next-line no-magic-numbers
  expect(range(3)).toEqual([0, 1, 2]);
});
