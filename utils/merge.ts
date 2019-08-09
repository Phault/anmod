export function merge(object: any, source: any) {
  for (let key in source) {
    const value = source[key];
    if (typeof value !== 'undefined') object[key] = value;
  }
  return object;
}
