const { ChargingStation } = require("../src/ChargingStation");
const { Scooter } = require("../src/Scooter");

describe("Charging Station", () => {
  let scooter = null,
    brokenScooter = null,
    chargingScooter = null;
  station = null;

  beforeAll(() => {
    scooter = new Scooter();
    brokenScooter = new Scooter();
    chargingScooter = new Scooter();
    station = new ChargingStation("Jeff Street");
  });

  test("Initial state of station is valid", () => {
    expect(station.stationID).toBe(0);
    expect(station.name).toBe("Jeff Street");
    expect(station.scooters.length).toBe(0);
  });

  test("Adding a new scooter to a station should behave as expected", () => {
    station.addScooter(scooter);
    expect(station.scooters.length).toBe(1);
  });

  test("Getting all available scooters", () => {
    brokenScooter.markAsDamaged();
    chargingScooter.chargeAmount = 5;
    station.addScooter(brokenScooter);
    station.addScooter(chargingScooter);

    const availableScooters = station.getAvailableScooters();
    expect(availableScooters.length).toBe(1);
  });

  test("Taking a scooter removes it from the charging station", () => {
    const validScooter = station.takeScooter();
    expect(validScooter).toBeInstanceOf(Scooter);
  });

  test("Taking a scooter from a station with no available scooters should return null", () => {
    const nullScooter = station.takeScooter();
    expect(nullScooter).toBeNull();
  });
});
