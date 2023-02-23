/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const getPrompts = async () => {
  try {
    const prompts = await knex('prompts')
      .select(
        'prompts.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'prompts.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id');
    return prompts;
  } catch (error) {
    return error.message;
  }
};

const getPromptsByCategory = async (category) => {
  try {
    const promptsByCategory = await knex('prompts')
      .join('topics', 'prompts.topic_id', '=', 'topics.id')
      .where({
        'topics.category_id': category,
      });
    return promptsByCategory;
  } catch (error) {
    return error.message;
  }
};

const getPromptsByTopic = async (topic) => {
  try {
    const prompts = await knex('prompts').where({ topic_id: topic });
    return prompts;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getPrompts,
  getPromptsByCategory,
  getPromptsByTopic,
};
