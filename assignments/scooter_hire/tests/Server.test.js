const { ChargingStation } = require("../src/ChargingStation");
const { City } = require("../src/City");
const { Server } = require("../src/Server");
const { User } = require("../src/User");

describe("Server", () => {
  let chargingStation = null,
    city = null,
    server = null,
    user = null;

  beforeAll(() => {
    chargingStation = new ChargingStation("Station");
    city = new City("City");
    server = Server.getInstance();
    user = new User(
      "user",
      20,
      "email@email.com",
      "password",
      2342,
      "20-20-20"
    );

    server.cities.push(city);
    server.cities[0].chargingStations.push(chargingStation);
  });

  test("Checking that singleton returns valid instance of Server", () => {
    expect(typeof Server.getInstance()).not.toBeNull();
  });

  test("Checking for singleton persistence", () => {
    server.users.push(123);

    const instance2 = Server.getInstance();
    expect(instance2.users.length).toBe(1);

    server.users.slice(0, 1);
  });

  test("findChargingStation successfully finds the station", () => {
    const station = server.findChargingStation(0);
    expect(station.stationName).toBe("Station");
  });

  test("updateChargingStation succesfully updates the station", () => {
    const station = server.cities[0].chargingStations[0];
    station.stationName = "NewName";
    server.updateChargingStation(station);

    expect(server.cities[0].chargingStations[0].stationName).toBe("NewName");
  });
});
