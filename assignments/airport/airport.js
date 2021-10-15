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

/**
 * Class to represent a singular passenger on a plane
 * @class
 */
class Passenger {
  /**
   * A passenger requires a valid name, passport number and seat number to be on a plane.
   * @param {string} name
   * @param {string} passportNumber
   * @param {string} seatNumber
   * @constructor
   */
  constructor(name, passportNumber, seatNumber) {
    this.name = name;
    this.passportNumber = passportNumber;
    this.seatNumber = seatNumber;
    this.bags = [];

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
  /**
   * Adds a bag to the passenger object
   * @param {Bag} bag
   */
  addBag(bag) {
    this.bags.push(bag);
  }
}

/**
 * Class to represent a crew member on an airplane
 * @class
 */
class CrewMember {
  /**
   * A crew member requires a valid name, position and staff number in order to be created.
   * @param {string} name
   * @param {string} position
   * @param {number} staffNumber
   * @constructor
   */
  constructor(name, position, staffNumber) {
    this.name = name;
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

module.exports = { Passenger, Bag, CrewMember, Plane, Airport };
