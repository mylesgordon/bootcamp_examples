const { Menu, MenuItem } = require("../connection"),
  { Resource } = require("../resource");

class MenuItemResource extends Resource {
  static async delete(req, res) {
    await super.deleteResource(MenuItem, req, res);
  }
  static async getAll(req, res) {
    await super.fetchAllResources(MenuItem, res);
  }
  static async getByID(req, res) {
    await super.fetchResourceByID(MenuItem, req, res);
  }
  static async post(req, res) {
    try {
      if (!req.body.menuID) {
        throw new Error("Menu ID field required");
      }

      const menuID = req.body.menuID;
      delete req.body.menuID;

      const menuItem = await super.createResource(MenuItem, req, res, false);
      const menu = await Menu.findOne({
        where: { id: menuID },
      });

      menu.addMenuItem(menuItem);
      res.status(200).send(`Menu item ${req.body.name} created`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  static async put(req, res) {
    try {
      const itemToBeUpdated = await MenuItem.findOne({
        where: { id: req.body.id },
      });

      if (itemToBeUpdated === null) {
        res.status(404).send("Item was not found.");
      } else {
        if (req.body.name) {
          itemToBeUpdated.name = req.body.name;
        }

        if (req.body.price) {
          itemToBeUpdated.price = req.body.price;
        }

        itemToBeUpdated.save();
        res.status(201).send(`Item ${itemToBeUpdated.name} updated.`);
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = { MenuItemResource };
