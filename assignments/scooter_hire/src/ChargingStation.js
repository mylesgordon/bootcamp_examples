const { Scooter } = require("../src/Scooter");

class ChargingStation {
  static currentStationID = 0;

  constructor(name) {
    this.stationID = this.constructor.currentStationID++;
    this.stationName = name;
    this.scooters = [];
  }
  getAvailableScooters() {
    const available = [];
    this.scooters.forEach((scooter) => {
      if (scooter.isAvailable()) {
        available.push(scooter);
      }
    });

    return available;
  }
  takeScooter() {
    const available = this.getAvailableScooters();
    if (available.length === 0) {
      return null;
    }

    this.scooters = this.scooters.filter((scooter) => {
      scooter.scooterID != available[0].scooterID;
    });

    return available[0];
  }
  addScooter(scooter) {
    this.scooters.push(scooter);
  }
}
