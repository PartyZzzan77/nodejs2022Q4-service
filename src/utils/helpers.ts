export const cleanUpEntity = <T, K extends keyof T | 'password'>(
  obj: T,
  field: K,
): Pick<T, Exclude<keyof T, K>> => {
  return Object.keys(obj)
    .filter((key) => key !== field)
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Pick<T, Exclude<keyof T, K>>);
};
