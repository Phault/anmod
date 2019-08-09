export function fromEntries<T = any>(
  entries: Iterable<readonly [PropertyKey, T]>
): { [k in PropertyKey]: T } {
  return Array.from(entries).reduce(
    (obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }),
    {}
  );
}
