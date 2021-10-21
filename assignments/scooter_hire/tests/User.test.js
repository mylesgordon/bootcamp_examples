const { City } = require("../src/City");
const { ChargingStation } = require("../src/ChargingStation");
const { Server } = require("../src/Server");
const { Scooter } = require("../src/Scooter");
const { User } = require("../src/User");

describe("User", () => {
  let validUser = null;

  beforeAll(() => {
    validUser = new User(
      "user",
      20,
      "email@email.com",
      "password",
      2342,
      "20-20-20"
    );
  });

  test("Initial state of User is valid", () => {
    expect(validUser.userID).toBe(0);
    expect(validUser.name).toBe("user");
    expect(validUser.age).toBe(20);
    expect(validUser.email).toBe("email@email.com");
    expect(validUser.currentScooter).toBeNull();
    expect(validUser.password).toBe("password");
    expect(validUser.bankNumber).toBe(2342);
    expect(validUser.bankSortCode).toBe("20-20-20");
  });

  test("Correct password should return true", () => {
    expect(validUser.checkPassword("password")).toBeTruthy();
  });

  test("Bad password should return false", () => {
    expect(validUser.checkPassword("a")).toBeFalsy();
  });

  test("Charging a user should provide expected output", () => {
    const consoleCheck = jest.spyOn(console, "log");
    validUser.chargeBank(20);
    expect(consoleCheck).toHaveBeenCalledWith(
      "user's bank has been charged £20"
    );
  });

  test("Breaking a scooter should remove scooter from user posession", async () => {
    const server = Server.getInstance();
    const city = new City("TestCity");
    const station = new ChargingStation("TestStation");
    const scooter = new Scooter();

    station.addScooter(scooter);
    city.addChargingStation(station);
    server.addCity(city);

    validUser.currentScooter = station.takeScooter();
    await validUser.breakScooter();
    expect(validUser.currentScooter).toBeNull();
  });
});
