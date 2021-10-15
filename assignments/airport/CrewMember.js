const { Check } = require("./Check");
const { Person } = require("./Person");

/**
 * Class to represent a crew member on an airplane
 * @class
 */
class CrewMember extends Person {
  /**
   * A crew member requires a valid name, position and staff number in order to be created.
   * @param {string} name
   * @param {string} position
   * @param {number} staffNumber
   * @constructor
   */
  constructor(name, position, staffNumber) {
    super(name);
    this.position = position;
    this.staffNumber = staffNumber;

    this.isValidCrewMember();
  }
  /**
   * Checks whether the name, position and staff number are all of valid, instantiated types
   */
  isValidCrewMember() {
    if (
      !Check.isStringValid(this.name) ||
      !Check.isStringValid(this.position) ||
      !Check.isNumberValid(this.staffNumber)
    ) {
      throw "Crew member is not valid.";
    }
  }
}

module.exports = { CrewMember };
