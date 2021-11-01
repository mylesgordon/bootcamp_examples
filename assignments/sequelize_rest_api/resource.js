class Resource {
  // overridden by child classes
  static async delete(req, res) {}
  static async getAll(req, res) {}
  static async getByID(req, res) {}
  static async post(req, res) {}
  static async put(req, res) {}

  // non-overriden
  static async createResource(resourceType, request, response, doRespond) {
    try {
      const newResource = await resourceType.create(request.body);

      if (doRespond) {
        response.status(201).send(newResource);
      } else {
        return newResource;
      }
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  static async fetchAllResources(resourceType, request, response) {
    try {
      let orderArray = ["id", "ASC"],
        orderField = "id";
      const orderBy = request.query.orderBy;

      if (typeof orderBy != "undefined") {
        if (typeof request.query.field != "undefined") {
          orderField = request.query.field;
        }
      }

      orderArray = [orderField, orderBy];
      const resources = await resourceType.findAll({
        order: [orderArray],
      });
      response.status(201).send(resources);
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  static async fetchResourceByID(resourceType, request, response) {
    try {
      const resource = await resourceType.findOne({
        where: { id: request.params.id },
      });

      if (resource === null) {
        throw new Error(`Resource ID ${request.params.id} not found`);
      }

      response.status(201).send(resource);
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  static async deleteResource(resourceType, request, response) {
    try {
      const resourceOnTheBlock = await resourceType.findOne({
        where: { id: request.body.id },
      });

      if (resourceOnTheBlock === null) {
        response.status(404).send("Resource was not found.");
      } else {
        resourceOnTheBlock.destroy();
        response
          .status(201)
          .send(`Resource with ID ${resourceOnTheBlock.id} deleted.`);
      }
    } catch (error) {
      response.status(400).send(error.message);
    }
  }
}

module.exports = { Resource };
