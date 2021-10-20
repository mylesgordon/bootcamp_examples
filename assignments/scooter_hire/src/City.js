class City {
  static currentCityID = 0;

  constructor(name) {
    this.cityID = this.constructor.currentCityID++;
    this.name = name;
    this.chargingStations = [];

    if (this.name === undefined || this.name.length === 0) {
      throw "A city requires a name";
    }
  }
  addChargingStation(station) {
    this.chargingStations.push(station);
  }
  findChargingStation(name) {
    return this.chargingStations.find((station) => {
      if (station.stationName === name) {
        return true;
      } else {
        return false;
      }
    });
  }
}

module.exports = { City };
