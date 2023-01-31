export const cleanUpEntity = (obj, field = 'password') =>
  Object.keys(obj)
    .filter((key) => key !== field)
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
