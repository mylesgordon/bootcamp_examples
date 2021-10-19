class ChargingStation {
  static currentStationID = 0;

  constructor(name) {
    this.stationID = this.constructor.currentStationID++;
    this.stationName = name;
    this.scooters = [];
  }
  getAvailableScooters() {}
  takeScooter() {}
  returnScooter(scooter) {}
}
