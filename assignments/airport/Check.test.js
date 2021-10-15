const { Check } = require("./Check");

describe("Check", () => {
  test("Number: undefined number to be false", () => {
    expect(Check.isNumberValid()).toBe(false);
  });
  test("Number: not a number to be false", () => {
    expect(Check.isNumberValid("test")).toBe(false);
  });
  test("Number: valid number", () => {
    expect(Check.isNumberValid(294823)).toBe(true);
  });

  test("String: null string to be false", () => {
    expect(Check.isStringValid(null)).toBe(false);
  });
  test("String: undefined string to be false", () => {
    expect(Check.isStringValid()).toBe(false);
  });
  test("String: empty string to be false", () => {
    expect(Check.isStringValid("")).toBe(false);
  });
  test("String: valid string", () => {
    expect(Check.isStringValid("asdas")).toBe(true);
  });
});
