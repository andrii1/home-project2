/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const getPrompts = async () => {
  return knex('prompts');
};

const getPromptsByCategory = async (category) => {
  try {
    const topics = await knex('prompts').where({ category_id: category });
    return topics;
  } catch (error) {
    return error.message;
  }
};

const getPromptsByTopic = async (topic) => {
  try {
    const topics = await knex('prompts').where({ topic_id: topic });
    return topics;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getPrompts,
  getPromptsByCategory,
  getPromptsByTopic,
};
