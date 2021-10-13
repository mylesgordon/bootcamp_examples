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

  test("Checking that everyone who has defined parents has them initiated, if not then just an empty array", () => {
    const noParents = [
      "King George VI",
      "Queen Elizabeth",
      "Prince Philip",
      "Camila",
      "Diana",
    ];

    for (let x = 0; x < generations.length; x++) {
      const currentGenerationMembers = generations[x].members;
      for (let y = 0; y < currentGenerationMembers.length; y++) {
        const currentMember = currentGenerationMembers[y];

        // if it isn't a royal family member who has no defined parents
        if (noParents.includes(currentMember.name)) {
          expect(currentMember.parents).toHaveLength(0);
        } else {
          expect(currentMember.parents).toHaveLength(2);
          expect(currentMember.parents[0]).toBeInstanceOf(
            royalFamilyModule.Person
          );
          expect(currentMember.parents[1]).toBeInstanceOf(
            royalFamilyModule.Person
          );
        }
      }
    }
  });
});
