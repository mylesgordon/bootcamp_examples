const { ChargingStation } = require("../src/ChargingStation");
const { City } = require("../src/City");
const { Scooter } = require("../src/Scooter");
const { Server } = require("../src/Server");
const { User } = require("../src/User");

describe("Server", () => {
  let chargingStation = null,
    city = null,
    server = null;

  beforeAll(() => {
    chargingStation = new ChargingStation("Station");
    city = new City("City");
    // second city is added for coverage
    city2 = new City("City2");

    server = Server.getInstance();

    server.cities.push(city);
    server.cities.push(city2);
    server.cities[0].chargingStations.push(chargingStation);
  });

  test("Checking that singleton returns valid instance of Server", () => {
    expect(typeof Server.getInstance()).not.toBeNull();
  });

  test("Registering a user behaves as expected", () => {
    server.registerUser(new User("a", 20, "email", "password", 123, "abc"));
    expect(server.users.length).toBe(1);
  });

  test("Checking for singleton persistence", () => {
    const instance2 = Server.getInstance();
    expect(instance2.users.length).toBe(1);
  });

  test("Log in with valid email and password", () => {
    expect(server.logIn("email", "password")).toBeTruthy();
  });

  test("Log in with invalid email or password should fail", () => {
    expect(server.logIn("essmail", "password")).toBeFalsy();
    expect(server.logIn("email", "2password")).toBeFalsy();
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

  test("Breaking a scooter works as expected", async () => {
    jest.useFakeTimers();
    const scooter = new Scooter();
    scooter.fromStation = 0;

    server.scooterDamaged(scooter);
    await jest.runAllTimers();
    expect(
      server.cities[0].chargingStations[0].scooters[0].isAvailable()
    ).toBeTruthy();
  });

  test("chargeUser finds and charges users correctly", () => {
    const consoleCheck = jest.spyOn(console, "log");
    server.chargeUser(0, 50);
    expect(consoleCheck).toHaveBeenCalledWith("a's bank has been charged £50");
  });
});
