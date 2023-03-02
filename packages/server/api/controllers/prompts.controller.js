/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

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

const getPromptsPagination = async (page, size) => {
  try {
    const getModel = () =>
      knex('prompts')
        .select(
          'prompts.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'prompts.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id');
    const totalCount = await getModel()
      .count('prompts.id', { as: 'rows' })
      .groupBy('prompts.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();

    return {
      totalCount: totalCount.length,
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getPromptsByCategories = async (categories, page, size) => {
  try {
    const getModel = () =>
      knex('prompts')
        .select(
          'prompts.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'prompts.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .whereIn('category_id', categories);
    const totalCount = await getModel()
      .count('prompts.id', { as: 'rows' })
      .groupBy('prompts.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    return {
      totalCount: totalCount.length,
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getPromptsByTopics = async (topics, page, size) => {
  try {
    const getModel = () =>
      knex('prompts')
        .select(
          'prompts.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'prompts.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .whereIn('topic_id', topics);
    const totalCount = await getModel()
      .count('prompts.id', { as: 'rows' })
      .groupBy('prompts.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    return {
      totalCount: totalCount.length,
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getPromptsByCategory = async (category) => {
  try {
    const promptsByCategory = await knex('prompts')
      .select(
        'prompts.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'prompts.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
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
    const promptsByTopic = await knex('prompts')
      .select(
        'prompts.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'prompts.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
      .where({ topic_id: topic });
    return promptsByTopic;
  } catch (error) {
    return error.message;
  }
};

// Get prommpts by id
const getPromptById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }
  try {
    const prompt = await knex('prompts')
      .select(
        'prompts.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'prompts.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
      .where({ 'prompts.id': id });
    if (prompt.length === 0) {
      throw new HttpError(`incorrect entry with the id of ${id}`, 404);
    }
    return prompt;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getPrompts,
  getPromptsPagination,
  getPromptsByCategories,
  getPromptsByTopics,
  getPromptsByCategory,
  getPromptsByTopic,
  getPromptById,
};
