const { Bag } = require("./Bag");
const { Passenger } = require("./Passenger");

describe("Passenger", () => {
  let validPassenger = null,
    testBag = null;

  beforeAll(() => {
    validPassenger = new Passenger("Jeff", "23409234", "1A");
    testBag = new Bag(50);
  });

  test("Empty passport number parameter throws error", () => {
    expect(() => new Passenger("Jeff", "", "1A")).toThrowError(
      "Passenger is not valid."
    );
  });
  test("Empty seat number parameter throws error", () => {
    expect(() => new Passenger("Jeff", "23409234", "")).toThrowError(
      "Passenger is not valid."
    );
  });
  test("addBag() with valid bag", () => {
    validPassenger.addBag(testBag);
    expect(validPassenger.bags.length).toBe(1);
  });
});
