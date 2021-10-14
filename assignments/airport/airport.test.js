const modAirport = require("./airport");

describe("Bag", () => {
  let underLimitBag = null,
    overLimitBag = null;

  beforeAll(() => {
    underLimitBag = new modAirport.Bag(50);
    overLimitBag = new modAirport.Bag(500);
  });

  test("Trying to create a bag without weight throws error", () => {
    expect(() => new modAirport.Bag()).toThrowError(
      "Bag must have a valid weight"
    );
  });
  test("Trying to create a bag with a non-number weight throws error", () => {
    expect(() => new modAirport.Bag("hello")).toThrowError(
      "Bag must have a valid weight"
    );
  });
  test("isOverLimit() with valid weight", () => {
    expect(underLimitBag.isOverLimit()).toBe(false);
  });
  test("isOverLimit() with invalid weight", () => {
    expect(overLimitBag.isOverLimit()).toBe(true);
  });
});

describe("Passenger", () => {
  let validPassenger = null,
    testBag = null;

  beforeAll(() => {
    validPassenger = new modAirport.Passenger("Jeff", "23409234", "1A");
    testBag = new modAirport.Bag(50);
  });

  test("Empty name parameter throws error", () => {
    expect(() => new modAirport.Passenger("", "23409234", "1A")).toThrowError(
      "Passenger is not valid."
    );
  });
  test("Empty passport number parameter throws error", () => {
    expect(() => new modAirport.Passenger("Jeff", "", "1A")).toThrowError(
      "Passenger is not valid."
    );
  });
  test("Empty seat number parameter throws error", () => {
    expect(() => new modAirport.Passenger("Jeff", "23409234", "")).toThrowError(
      "Passenger is not valid."
    );
  });
  test("addBag() with valid bag", () => {
    validPassenger.addBag(testBag);
    expect(validPassenger.bags.length).toBe(1);
  });
});

describe("Crew member", () => {
  test("Empty name parameter throws error", () => {
    expect(() => new modAirport.CrewMember("", "Pilot", 2422)).toThrowError(
      "Crew member is not valid."
    );
  });
  test("Empty position parameter throws error", () => {
    expect(() => new modAirport.CrewMember("Jeff", "", 2422)).toThrowError(
      "Crew member is not valid."
    );
  });
  test("Empty number parameter throws error", () => {
    expect(() => new modAirport.CrewMember("Jeff", "Pilot")).toThrowError(
      "Crew member is not valid."
    );
  });
});

describe("Plane", () => {
  let plane = null,
    passenger = null,
    crewMember = null;

  beforeAll(() => {
    plane = new modAirport.Plane("Boeing 747");
    passenger = new modAirport.Passenger("Jeff", "23409234", "1A");
    crewMember = new modAirport.CrewMember("Jeff", "Pilot", 2422);
  });

  test("Trying to create a plane without a type throws error", () => {
    expect(() => new modAirport.Plane()).toThrowError("Plane must have a type");
  });
  test("Trying to create a plane with an empty type throws error", () => {
    expect(() => new modAirport.Plane("")).toThrowError(
      "Plane must have a type"
    );
  });
  test("Boarding a valid passenger", () => {
    plane.board(passenger);
    expect(plane.passengers.length).toBe(1);
  });
  test("Boarding a valid crew member", () => {
    plane.board(crewMember);
    expect(plane.passengers.length).toBe(2);
  });
});

describe("Airport", () => {
  let airport = null,
    airplane = null;

  beforeAll(() => {
    airport = new modAirport.Airport("Some Airport");
    airplane = new modAirport.Plane("Boeing 747");
  });

  test("Trying to create an airport without a name throws error", () => {
    expect(() => new modAirport.Airport()).toThrowError(
      "Airport must have a valid name"
    );
  });
  test("Trying to create an airport with an empty name throws error", () => {
    expect(() => new modAirport.Airport("")).toThrowError(
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
