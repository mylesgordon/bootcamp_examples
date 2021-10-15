const { Check } = require("./Check");

/**
 * Class to represent a passenger's luggage bag
 * @class
 */
class Bag {
  /**
   * Requires the weight of the bag as a parameter, which can be checked
   * @param {number} weight
   * @constructor
   */
  constructor(weight) {
    this.weight = weight;
    this.isValidWeight();
  }
  /**
   * Checks whether the passed weight is actually a valid number
   */
  isValidWeight() {
    if (!Check.isNumberValid(this.weight)) {
      throw "Bag must have a valid weight";
    }
  }
  /**
   * Checks whether the luggage is over an arbitrarily picked weight limit
   * @returns {boolean}
   */
  isOverLimit() {
    return this.weight >= 250;
  }
}

module.exports = { Bag };
