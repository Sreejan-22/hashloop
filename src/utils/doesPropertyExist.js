export const doesPropertyExist = (property, obj) => {
  // property is a string
  return obj.hasOwnProperty(property)
    ? obj[property] === "" || obj[property] === null || obj[property] === []
      ? false
      : true
    : false;
};
