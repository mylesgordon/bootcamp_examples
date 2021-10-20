class Server {
  static instance = null;

  constructor() {
    this.users = [];
    this.cities = [];
  }
  static createInstance() {
    let obj = new Server();
    return obj;
  }
  static getInstance() {
    if (this.instance === null) {
      this.instance = this.createInstance();
    }
    return this.instance;
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
