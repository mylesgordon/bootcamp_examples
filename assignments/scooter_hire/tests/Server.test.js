const { Server } = require("../src/Server");

describe("Server", () => {
  test("Checking that singleton returns valid instance of Server", () => {
    expect(typeof Server.getInstance()).not.toBeNull();
  });

  test("Checking for singleton persistence", () => {
    const instance = Server.getInstance();
    instance.users.push(123);

    const instance2 = Server.getInstance();
    expect(instance2.users.length).toBe(1);

    instance.users.slice(0, 1);
  });
});
