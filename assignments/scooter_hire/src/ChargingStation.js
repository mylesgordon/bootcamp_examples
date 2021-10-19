const { Scooter } = require("../src/Scooter");

class ChargingStation {
  static currentStationID = 0;

  constructor(name) {
    this.stationID = this.constructor.currentStationID++;
    this.stationName = name;
    this.scooters = [];
  }
  getAvailableScooters() {}
  takeScooter() {}
  // TODO: make the name of this subroutine better
  returnScooter(scooter) {}
}
