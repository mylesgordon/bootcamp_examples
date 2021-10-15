const { Airport } = require("./Airport");
const { Plane } = require("./Plane");

describe("Airport", () => {
  let airport = null,
    airplane = null;

  beforeAll(() => {
    airport = new Airport("Some Airport");
    airplane = new Plane("Boeing 747");
  });

  test("Seeing if new airport was added to static airports array", () => {
    expect(Airport.airports.length).toBe(1);
  });
  test("Trying to create an airport without a name throws error", () => {
    expect(() => new Airport()).toThrowError("Airport must have a valid name");
  });
  test("Trying to create an airport with an empty name throws error", () => {
    expect(() => new Airport("")).toThrowError(
      "Airport must have a valid name"
    );
  });
  test("Having a plane land at airport", () => {
    airport.planeLand(airplane);
    expect(airport.planes.length).toBe(1);
  });
  test("Having a plane take off from the airport", () => {
    airport.planeTakeOff(airplane);
    expect(airport.planes.length).toBe(0);
  });
});
