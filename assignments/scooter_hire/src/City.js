class City {
  static currentCityID = 0;

  constructor(name) {
    this.cityID = this.constructor.currentCityID++;
    this.name = name;
    this.chargingStations = [];
  }
  addChargingStation(station) {}
  findChargingStation(name) {}
}
