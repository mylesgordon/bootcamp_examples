const { Check } = require("./Check");
const { Person } = require("./Person");

/**
 * Class to represent a singular passenger on a plane
 * @class
 */
class Passenger extends Person {
  /**
   * A passenger requires a valid name, passport number and seat number to be on a plane.
   * @param {string} name
   * @param {string} passportNumber
   * @param {string} seatNumber
   * @constructor
   */
  constructor(name, passportNumber, seatNumber) {
    super(name);
    this.passportNumber = passportNumber;
    this.seatNumber = seatNumber;

    this.isValidPassenger();
  }
  /**
   * Checks whether the name, passport number and seat number are all valid strings.
   */
  isValidPassenger() {
    const toCheck = [this.name, this.passportNumber, this.seatNumber];
    toCheck.forEach((field) => {
      if (!Check.isStringValid(field)) {
        throw "Passenger is not valid.";
      }
    });
  }
}

module.exports = { Passenger };
