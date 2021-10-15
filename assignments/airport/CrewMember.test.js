const { CrewMember } = require("./CrewMember");

describe("Crew member", () => {
  test("Empty position parameter throws error", () => {
    expect(() => new CrewMember("Jeff", "", 2422)).toThrowError(
      "Crew member is not valid."
    );
  });
  test("Empty number parameter throws error", () => {
    expect(() => new CrewMember("Jeff", "Pilot")).toThrowError(
      "Crew member is not valid."
    );
  });
});
