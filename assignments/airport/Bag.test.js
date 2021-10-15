const { Bag } = require("./Bag");

describe("Bag", () => {
  let underLimitBag = null,
    overLimitBag = null;

  beforeAll(() => {
    underLimitBag = new Bag(50);
    overLimitBag = new Bag(500);
  });

  test("Trying to create a bag without weight throws error", () => {
    expect(() => new Bag()).toThrowError("Bag must have a valid weight");
  });
  test("Trying to create a bag with a non-number weight throws error", () => {
    expect(() => new Bag("hello")).toThrowError("Bag must have a valid weight");
  });
  test("isOverLimit() with valid weight", () => {
    expect(underLimitBag.isOverLimit()).toBe(false);
  });
  test("isOverLimit() with invalid weight", () => {
    expect(overLimitBag.isOverLimit()).toBe(true);
  });
});
