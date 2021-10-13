const additionModule = require("./addition");

describe("addition checking", () => {
  test("adding 1, 2 and 3", () => {
    expect(additionModule.addition([1, 2, 3])).toEqual(6);
  });
});
