const { Server } = require("./Server");

class User {
  static currentUserID = 0;

  constructor(name, age, email, password, bankNumber, bankSortCode) {
    this.userID = this.constructor.currentUserID++;
    this.name = name;
    this.age = age;
    this.email = email;
    this.currentScooter = null;
    this.password = password;
    this.bankNumber = bankNumber;
    this.bankSortCode = bankSortCode;
  }
  breakScooter() {
    Server.getInstance().scooterDamaged(scooter);
    this.currentScooter = null;
  }
  checkPassword(password) {
    return password === this.password;
  }
  chargeBank(amount) {
    console.log(`${this.name}'s bank has been charged £${amount}`);
  }
}

module.exports = { User };
