class Bag {
  constructor(weight) {
    this.weight = weight;
    this.isValidWeight();
  }
  isValidWeight() {
    if (this.weight === undefined) {
      throw "Bag must have a weight";
    } else if (isNaN(this.weight)) {
      throw "Bag weight must be a number";
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
      if (field.length === 0 || field == null) {
        throw "Passenger is not valid.";
      }
    });
  }
  addBag(bag) {
    this.bags.push(bag);
  }
}

class CrewMember {}

class Plane {}

module.exports = { Passenger, Bag, CrewMember, Plane };
