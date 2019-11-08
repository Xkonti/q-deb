export interface LinqQualifier<T> {
  (value: T): boolean;
}

export function any<T>(array: T[], qualifier: LinqQualifier<T>): boolean {
  for (const value of array) {
    if (qualifier(value)) return true;
  }
  return false;
}

export function all<T>(array: T[], qualifier: LinqQualifier<T>): boolean {
  for (const value of array) {
    if (!qualifier(value)) return false;
  }
  return true;
}
