const royalFamilyModule = require("./royalFamily");

let generations = royalFamilyModule.findGenerations();

describe("Check that we receive an array of Generation classes from findGeneration", () => {
  test("Checking for correct array length", () => {
    expect(generations.length).toBe(3);
  });

  test("Checking that each of the array members are of type Generation", () => {
    generations.forEach((generation) =>
      expect(generation).toBeInstanceOf(royalFamilyModule.Generation)
    );
  });
});
