/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const appsController = require('../controllers/apps.controller');

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
  if (req.query.filteredTopics && req.query.search) {
    const array = req.query.filteredTopics.split(',');
    appsController
      .getAppsByTopicsSearch(
        req.query.search,
        array,
        req.query.column,
        req.query.direction,
        req.query.page,
        req.query.size,
      )
      .then((result) => res.json(result))
      .catch(next);
  } else if (req.query.filteredCategories && req.query.search) {
    const array = req.query.filteredCategories.split(',');
    appsController
      .getAppsByCategoriesSearch(
        req.query.search,
        array,
        req.query.column,
        req.query.direction,
        req.query.page,
        req.query.size,
      )
      .then((result) => res.json(result))
      .catch(next);
  } else if (req.query.filteredTopics) {
    const array = req.query.filteredTopics.split(',');
    appsController
      .getAppsByTopics(
        array,
        req.query.column,
        req.query.direction,
        req.query.page,
        req.query.size,
      )
      .then((result) => res.json(result))
      .catch(next);
  } else if (req.query.filteredCategories) {
    const array = req.query.filteredCategories.split(',');
    appsController
      .getAppsByCategories(
        array,
        req.query.column,
        req.query.direction,
        req.query.page,
        req.query.size,
      )
      .then((result) => res.json(result))
      .catch(next);
  } else if (req.query.search) {
    appsController
      .getAppsSearch(
        req.query.search,
        req.query.column,
        req.query.direction,
        req.query.page,
        req.query.size,
      )
      .then((result) => res.json(result))
      .catch(next);
  } else {
    appsController
      .getApps()
      .then((result) => res.json(result))
      .catch(next);
  }
});

/* Create Apps */

router.post('/', (req, res, next) => {
  const { token } = req.headers;
  appsController
    .createApps(token, req.body)
    .then((result) => res.json(result))
    .catch(next);
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
  appsController
    .getPromptById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
