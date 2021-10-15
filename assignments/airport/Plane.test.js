const { Airport } = require("./Airport");
const { CrewMember } = require("./CrewMember");
const { Passenger } = require("./Passenger");
const { Plane } = require("./Plane");

describe("Plane", () => {
  let plane = null,
    passenger = null,
    crewMember = null,
    airport = null;

  beforeAll(() => {
    plane = new Plane("Boeing 747");
    passenger = new Passenger("Jeff", "23409234", "1A");
    crewMember = new CrewMember("Jeff", "Pilot", 2422);
    airport = new Airport("LAX");
    airport2 = new Airport("Heathrow");
  });

  afterAll(() => {
    Airport.airports.splice(0, 2);
  });

  test("Trying to create a plane without a type throws error", () => {
    expect(() => new Plane()).toThrowError("Plane must have a type");
  });
  test("Trying to create a plane with an empty type throws error", () => {
    expect(() => new Plane("")).toThrowError("Plane must have a type");
  });
  test("Boarding a valid passenger", () => {
    plane.board(passenger);
    expect(plane.passengers.length).toBe(1);
  });
  test("Boarding a valid crew member", () => {
    plane.board(crewMember);
    expect(plane.passengers.length).toBe(2);
  });
  test("Flying a plane to a non-existent airport throws error", () => {
    expect(() => plane.flyTo(5)).toThrowError(
      "Cannot fly to non-existent airport"
    );
  });
  test("Flying a plane to an existing airport should be successful", () => {
    plane.flyTo(0);
    expect(plane.airportID).toBe(0);
    expect(Airport.airports[0].planes.length).toBe(1);
  });
  test("Flying a plane to another airport should be successful", () => {
    plane.flyTo(1);
    expect(plane.airportID).toBe(1);
    expect(Airport.airports[0].planes.length).toBe(0);
    expect(Airport.airports[1].planes.length).toBe(1);
  });
});
