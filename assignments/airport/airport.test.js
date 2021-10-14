const modAirport = require("./airport");

describe("Bag testing", () => {
  let underLimitBag = null,
    overLimitBag = null;

  beforeAll(() => {
    underLimitBag = new modAirport.Bag(50);
    overLimitBag = new modAirport.Bag(500);
  });

  test("Trying to create a bag without weight throws error", () => {
    expect(() => new modAirport.Bag()).toThrowError("Bag must have a weight");
  });
  test("Trying to create a bag with a non-number weight throws error", () => {
    expect(() => new modAirport.Bag("hello")).toThrowError(
      "Bag weight must be a number"
    );
  });
  test("isOverLimit() with valid weight", () => {
    expect(underLimitBag.isOverLimit()).toBe(false);
  });
  test("isOverLimit() with invalid weight", () => {
    expect(overLimitBag.isOverLimit()).toBe(true);
  });
});

describe("Passenger testing", () => {
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
