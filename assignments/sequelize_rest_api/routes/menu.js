const { Resource } = require("../resource"),
  { Menu, Restaurant } = require("../connection");

class MenuResource extends Resource {
  static async delete(req, res) {
    await super.deleteResource(Menu, req, res);
  }
  static async getAll(req, res) {
    await super.fetchAllResources(Menu, res);
  }
  static async getByID(req, res) {
    await super.fetchResourceByID(Menu, req, res);
  }
  static async post(req, res) {
    try {
      if (!req.body.restaurauntID) {
        throw new Error("Restauraunt ID field required");
      }

      const restaurauntId = req.body.restaurauntID;
      delete req.body.restaurauntID;

      const menu = await super.createResource(Menu, req, res, false);
      const restauraunt = await Restaurant.findOne({
        where: { id: restaurauntId },
      });

      restauraunt.addMenu(menu);
      res.status(200).send(`Menu ${req.body.title} created`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  static async put(req, res) {
    try {
      const menuToBeUpdated = await Menu.findOne({
        where: { id: req.body.id },
      });

      if (menuToBeUpdated === null) {
        res.status(404).send("Menu was not found.");
      } else {
        if (req.body.title) {
          menuToBeUpdated.title = req.body.title;
        }

        menuToBeUpdated.save();
        res.status(201).send(`Menu ${menuToBeUpdated.title} updated.`);
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = { MenuResource };
