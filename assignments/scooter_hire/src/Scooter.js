class Scooter {
  static currentScooterID = 0;

  constructor() {
    this.scooterID = this.constructor.currentScooterID++;
    this.chargeAmount = 100;
    this.damaged = false;
  }
  async charge() {
    console.log(`Charging scooter (ID: ${this.scooterID}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.chargeAmount = 100;
    console.log(`Scooter ${this.scooterID} is now fully charged`);
  }
  driveSpecifiedKilometers(amount) {
    if (amount > 32) {
      console.log("Scooter died mid-way through drive!");
      this.chargeAmount = 0;
    } else {
      const diff = 32 - amount;
      const batteryPerKilometer = 3.125;
      this.chargeAmount = batteryPerKilometer * diff;
    }
  }
  markAsDamaged() {
    this.damaged = true;
  }
  isAvailable() {
    return this.isFullyCharged() && !this.damaged;
  }
  isFullyCharged() {
    return this.chargeAmount >= 100;
  }
}
