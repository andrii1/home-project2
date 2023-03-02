/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const promptsController = require('../controllers/prompts.controller');

/**
 * @swagger
 * /exampleResource:
 *  get:
 *    tags:
 *    - exampleResource
 *    summary: Get all exampleResource
 *    description:
 *      Will return all exampleResource.
 *    produces: application/json
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/', (req, res, next) => {
  if (req.query.filteredTopics) {
    const array = req.query.filteredTopics.split(',');
    promptsController
      .getPromptsByTopics(array, req.query.page, req.query.size)
      .then((result) => res.json(result))
      .catch(next);
  } else if (req.query.filteredCategories) {
    const array = req.query.filteredCategories.split(',');
    promptsController
      .getPromptsByCategories(array, req.query.page, req.query.size)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    promptsController
      .getPromptsPagination(req.query.page, req.query.size)
      .then((result) => res.json(result))
      .catch(next);
  }
});

/**
 * @swagger
 * /exampleResources/{ID}:
 *  get:
 *    tags:
 *    - ExampleResources
 *    summary: Get exampleResource by ID
 *    description:
 *      Will return single exampleResource with a matching ID.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the exampleResource to get
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */

router.get('/:id', (req, res, next) => {
  promptsController
    .getPromptById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
