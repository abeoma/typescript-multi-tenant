export function range(len: number): number[] {
  return Array.from({ length: len }, (_, k) => k);
}

export function choice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
