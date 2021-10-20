const { Scooter } = require("../src/Scooter");

describe("Scooter", () => {
  let scooter = null;

  beforeAll(() => {
    scooter = new Scooter();
  });

  test("Driving too far kills the scooter", () => {
    const consoleCheck = jest.spyOn(console, "log");
    scooter.driveSpecifiedKilometers(50);
    expect(consoleCheck).toHaveBeenCalledWith(
      "Scooter died mid-way through drive!"
    );
    expect(scooter.chargeAmount).toBe(0);
  });

  test("Charging", async () => {
    await scooter.charge();
  });

  test("Driving a certain distance takes off the correct battery percentage", () => {
    scooter.driveSpecifiedKilometers(10);
    expect(scooter.chargeAmount).toBe(68.75);
  });

  test("Valid scooter should be marked as available", () => {
    scooter.chargeAmount = 100;
    expect(scooter.isAvailable()).toBeTruthy();
  });

  test("Marking scooter as damaged works as expected and makes it unavailable", () => {
    scooter.markAsDamaged();
    expect(scooter.damaged).toBeTruthy();
    expect(scooter.isAvailable()).toBeFalsy();
    scooter.damaged = false;
  });
});
