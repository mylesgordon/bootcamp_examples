/**
 * Simple helper class to check whether an inputted string or number are valid
 * @class
 */
class Check {
  /**
   * Checks whether an inputted number is valid (not undefined & of the number type)
   * @param {number} number
   * @returns {boolean}
   */
  static isNumberValid(number) {
    if (number === undefined || isNaN(number)) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * Checks whether an inputted string is valid (not undefined/null & of the string)
   * @param {string} string
   * @returns {boolean}
   */
  static isStringValid(string) {
    if (string == null || string.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = { Check };
