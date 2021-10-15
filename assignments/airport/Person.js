const { Check } = require("./Check");

/**
 * Represents any person within the airport system, such as a passenger or crew member
 * @class
 */
class Person {
  /**
   * The only requirement for a person is that they have a name
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.bags = [];

    this.isValidPerson();
  }
  /**
   * Checks whether the person has a valid name
   */
  isValidPerson() {
    if (!Check.isStringValid(this.name)) {
      throw "Person requires a valid name";
    }
  }
  /**
   * Adds a bag to the passenger object
   * @param {Bag} bag
   */
  addBag(bag) {
    this.bags.push(bag);
  }
}

module.exports = { Person };
