class City {
  static currentCityID = 0;

  constructor(name) {
    this.cityID = this.constructor.currentCityID++;
    this.name = name;
    this.chargingStations = [];
  }
  addChargingStation(station) {
    this.chargingStations.push(station);
  }
  findChargingStation(name) {
    return this.chargingStations.find((station) => {
      if (station.name === name) {
        return true;
      } else {
        return false;
      }
    });
  }
}
