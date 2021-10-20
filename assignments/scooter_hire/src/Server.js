class Server {
  static instance = null;

  constructor() {
    this.users = [];
    this.cities = [];
  }
  static createInstance() {
    let obj = new Server();
    return obj;
  }
  static getInstance() {
    if (this.instance === null) {
      this.instance = this.createInstance();
    }
    return this.instance;
  }
  registerUser(user) {
    this.users.push(user);
  }
  logIn(email, password) {
    return this.users.find((user) => {
      if (user.email === email && user.checkPassword(password)) {
        return true;
      } else {
        return false;
      }
    });
  }
  chargeUser(userID, amount) {
    this.users.find((user) => {
      if (user.userID === userID) {
        user.chargeBank(amount);
        return true;
      }
    });
  }
  addCity(city) {
    this.cities.push(city);
  }
  findChargingStation(stationID) {
    let stationReturn = null;

    let found = false;
    this.cities.every((city) => {
      city.chargingStations.every((station) => {
        if (station.stationID === stationID) {
          stationReturn = station;
          found = true;
        }

        return !found;
      });

      return !found;
    });

    return stationReturn;
  }
  updateChargingStation(newStation) {
    let found = false;
    for (let x = 0; x < this.cities.length; x++) {
      if (found) {
        break;
      }

      for (let y = 0; y < this.cities[x].chargingStations.length; y++) {
        if (
          this.cities[x].chargingStations[y].stationID === newStation.stationID
        ) {
          this.cities[x].chargingStations[y] = newStation;
          found = true;
          break;
        }
      }
    }
  }
  async scooterDamaged(scooter) {
    scooter.markAsDamaged();

    // rather than having to remove then add once scooter is fixed, keep a persistent copy of the station around to work with
    const station = this.findChargingStation(scooter.fromStation);

    const stationDamaged = station;
    stationDamaged.addScooter(scooter);
    this.updateChargingStation(stationDamaged);
    console.log(
      "Scooter has been marked as damaged... Maintenance has been informed"
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    scooter.markAsFixed();
    station.addScooter(scooter);
    this.updateChargingStation(station);

    console.log("Scooter fixed.");
  }
}

module.exports = { Server };
