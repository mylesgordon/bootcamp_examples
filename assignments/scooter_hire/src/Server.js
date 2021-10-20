class Server {
  constructor() {
    this.users = [];
    this.cities = [];
  }
  registerUser(user) {
    this.users.push(user);
  }
  logIn(email, password) {
    return this.users.find((user) => {
      if (user.email === email && user.checkPassword(password)) {
        return true;
      } else {
        return false;
      }
    });
  }
  chargeUser(userID, amount) {
    this.users.find((user) => {
      if (user.userID === userID) {
        user.chargeBank(amount);
        return true;
      }
    });
  }
  addCity(city) {
    this.cities.push(city);
  }
}

module.exports = { Server };
