const { Check } = require("./Check");

/**
 * A class to represent an airport
 * @class
 */
class Airport {
  /**
   * Contains all known airports
   * @static
   */
  static airports = [];
  /**
   * An airport requires a valid name
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.planes = [];
    this.airportID = this.constructor.airports.length;
    this.isAirportValid();

    this.constructor.airports.push(this);
  }
  /**
   * Checks whether the airport name is a valid string
   */
  isAirportValid() {
    if (!Check.isStringValid(this.name)) {
      throw "Airport must have a valid name";
    }
  }
  /**
   * Handles when a specified plane take off, removing them from the planes array.
   * @param {Plane} plane
   */
  planeTakeOff(plane) {
    this.planes = this.planes.filter(
      (planeElement) => planeElement.planeID != plane.planeID
    );
  }
  /**
   * Handles when a plane arrives, adding them to the planes array.
   * @param {Plane} plane
   */
  planeLand(plane) {
    plane.airportID = this.airportID;
    this.planes.push(plane);
  }
}

module.exports = { Airport };
