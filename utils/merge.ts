export function merge<T>(object: T, source: Partial<T>) {
  for (let key in source) {
    const value = source[key];
    if (typeof value !== 'undefined') object[key] = value;
  }
  return object;
}
