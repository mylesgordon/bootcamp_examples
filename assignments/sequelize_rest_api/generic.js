async function createResource(resourceType, request, response, doRespond) {
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

async function fetchAllResources(resourceType, response) {
  try {
    const resources = await resourceType.findAll({});
    response.status(201).send(resources);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function deleteResource(resourceType, request, response) {
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

module.exports = { createResource, fetchAllResources, deleteResource };
