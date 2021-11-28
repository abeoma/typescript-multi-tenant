export const range = (len: number): number[] => {
  return Array.from({ length: len }, (_, k) => k);
};

export const choice = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};
