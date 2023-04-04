/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

/* Get all topics */
const getTopics = async () => {
  try {
    const topics = await knex('topics')
      .select(
        'topics.category_id as categoryId',
        'categories.title as categoryTitle',
        'topics.id as topicId',
        'topics.title as topicTitle',
      )
      .join('categories', 'topics.category_id', '=', 'categories.id');
    return topics;
  } catch (error) {
    return error.message;
  }
};

// Get topics by Category
const getTopicsByCategory = async (category) => {
  try {
    const topics = await knex('topics').where({ category_id: category });
    return topics;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getTopics,
  getTopicsByCategory,
};
