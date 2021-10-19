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
  checkPassword(password) {}
  chargeBank(amount) {}
}
