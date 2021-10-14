class Check {
  static isNumberValid(number) {
    if (number === undefined || isNaN(number)) {
      return false;
    } else {
      return true;
    }
  }
  static isStringValid(string) {
    if (string == null || string.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}

class Bag {
  constructor(weight) {
    this.weight = weight;
    this.isValidWeight();
  }
  isValidWeight() {
    if (!Check.isNumberValid(this.weight)) {
      throw "Bag must have a valid weight";
    }
  }
  isOverLimit() {
    return this.weight >= 250;
  }
}

class Passenger {
  constructor(name, passportNumber, seatNumber) {
    this.name = name;
    this.passportNumber = passportNumber;
    this.seatNumber = seatNumber;
    this.bags = [];

    this.isValidPassenger();
  }
  isValidPassenger() {
    const toCheck = [this.name, this.passportNumber, this.seatNumber];
    toCheck.forEach((field) => {
      if (!Check.isStringValid(field)) {
        throw "Passenger is not valid.";
      }
    });
  }
  addBag(bag) {
    this.bags.push(bag);
  }
}

class CrewMember {
  constructor(name, position, staffNumber) {
    this.name = name;
    this.position = position;
    this.staffNumber = staffNumber;

    this.isValidCrewMember();
  }
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

let planeID = 0;

class Plane {
  constructor(type) {
    this.type = type;
    this.passengers = [];
    this.planeID = planeID++;

    this.isPlaneValid();
  }
  isPlaneValid() {
    if (!Check.isStringValid(this.type)) {
      throw "Plane must have a type";
    }
  }
  board(passenger) {
    this.passengers.push(passenger);
  }
}

class Airport {
  constructor(name) {
    this.name = name;
    this.planes = [];
    this.isAirportValid();
  }
  isAirportValid() {
    if (!Check.isStringValid(this.name)) {
      throw "Airport must have a valid name";
    }
  }
  planeTakeOff(plane) {
    this.planes = this.planes.filter(
      (planeElement) => planeElement.planeID != plane.planeID
    );
  }
  planeLand(plane) {
    this.planes.push(plane);
  }
}

module.exports = { Passenger, Bag, CrewMember, Plane, Airport };
