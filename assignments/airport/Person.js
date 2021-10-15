const { Check } = require("./Check");

class Person {
  constructor(name) {
    this.name = name;
    this.bags = [];

    this.isValidPerson();
  }
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
