const { City } = require("../src/City");
const { ChargingStation } = require("../src/ChargingStation");

describe("City", () => {
  let city = null,
    station = null;

  beforeAll(() => {
    city = new City("TestCity");
    station = new ChargingStation("Station");
  });

  test("Creating a city with a valid name should behave as expected", () => {
    expect(city.cityID).toBe(0);
    expect(city.name).toBe("TestCity");
  });

  test("Creating a city with an invalid name should throw an error", () => {
    expect(() => new City()).toThrowError("A city requires a name");
  });

  test("Adding a charging station should behave as expected", () => {
    city.addChargingStation(station);
    expect(city.chargingStations.length).toBe(1);
  });

  test("Finding a charging station by name should behave as expected", () => {
    const foundStation = city.findChargingStation("Station");
    expect(foundStation.stationName).toBe("Station");
    expect(city.findChargingStation("wrong name")).toBeUndefined();
  });
});
