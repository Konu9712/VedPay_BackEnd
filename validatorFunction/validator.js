/**
 * Check if variable is undefined/Empty or not
 * @param {*} str
 */
exports.isEmpty = (value) => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  ) {
    return true;
  } else {
    return false;
  }
};
/**
 * Check if variable is Email or not
 * @param {*} str
 */
exports.isEmail = (value) => {
  const myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = myRegEx.test(value);
  return isValid;
};
