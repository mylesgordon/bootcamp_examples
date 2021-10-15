const { Check } = require("./Check");
const { Airport } = require("./Airport");

/**
 * A class to represent a plane at an airport
 * @class
 */
class Plane {
  /**
   * Contains the next plane ID so that all planes can be uniquely identified
   * @static
   */
  static sPlaneID = 0;
  /**
   * A plane requires a valid type, which is of type string
   * @param {string} type
   * @constructor
   */
  constructor(type) {
    this.type = type;
    this.passengers = [];
    this.planeID = this.constructor.sPlaneID++;
    this.airportID = -1;

    this.isPlaneValid();
  }
  /**
   * Checks whether the plane type is a valid string
   */
  isPlaneValid() {
    if (!Check.isStringValid(this.type)) {
      throw "Plane must have a type";
    }
  }
  /**
   * Boards a passenger onto the plane, adding them to the passengers array
   * @param {Passenger} passenger
   */
  board(passenger) {
    this.passengers.push(passenger);
  }
  /**
   * Flies the plane to the airport given the airport ID
   * @param {number} airportID
   */
  flyTo(airportID) {
    if (Airport.airports.length < airportID) {
      throw "Cannot fly to non-existent airport";
    }

    if (this.airportID != -1) {
      Airport.airports[this.airportID].planeTakeOff(this);
    }
    Airport.airports[airportID].planeLand(this);
  }
}

module.exports = { Plane };
