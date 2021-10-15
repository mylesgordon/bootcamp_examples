const { Person } = require("./Person");

describe("Person", () => {
  test("Empty name parameter throws error", () => {
    expect(() => new Person()).toThrowError("Person requires a valid name");
  });
});
