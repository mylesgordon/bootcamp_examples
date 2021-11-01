const { Resource } = require("../resource"),
  { Restaurant } = require("../connection");

class RestaurauntResource extends Resource {
  static async delete(req, res) {
    await super.deleteResource(Restaurant, req, res);
  }
  static async getAll(req, res) {
    await super.fetchAllResources(Restaurant, req, res);
  }
  static async getByID(req, res) {
    await super.fetchResourceByID(Restaurant, req, res);
  }
  static async post(req, res) {
    await super.createResource(Restaurant, req, res, true);
  }
  static async put(req, res) {
    try {
      const restaurantToBeUpdated = await Restaurant.findOne({
        where: { id: req.body.id },
      });

      if (restaurantToBeUpdated === null) {
        res.status(404).send("Restaurant was not found.");
      } else {
        if (req.body.name) {
          restaurantToBeUpdated.name = req.body.name;
        }

        if (req.body.imageLink) {
          restaurantToBeUpdated.imageLink = req.body.imageLink;
        }

        restaurantToBeUpdated.save();
        res
          .status(201)
          .send(`Restaurant ${restaurantToBeUpdated.name} updated.`);
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = { RestaurauntResource };
