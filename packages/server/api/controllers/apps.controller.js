/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getApps = async () => {
  try {
    const apps = await knex('apps')
      .select(
        'apps.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'apps.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
      .orderBy('id', 'asc');
    return apps;
  } catch (error) {
    return error.message;
  }
};

const getAppsPagination = async (column, direction, page, size) => {
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'apps.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();

    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsSearch = async (search, column, direction, page, size) => {
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'apps.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .orderBy(column, direction)
        .where('apps.title', 'like', `%${search}%`);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();

    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsByCategoriesSearch = async (
  search,
  categories,
  column,
  direction,
  page,
  size,
) => {
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'apps.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .whereIn('category_id', categories)
        .where('apps.title', 'like', `%${search}%`)
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();
    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsByCategories = async (
  categories,
  column,
  direction,
  page,
  size,
) => {
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'apps.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .whereIn('category_id', categories)
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();
    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsByTopicsSearch = async (
  search,
  topics,
  column,
  direction,
  page,
  size,
) => {
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'apps.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .whereIn('topic_id', topics)
        .where('apps.title', 'like', `%${search}%`)
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();
    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsByTopics = async (topics, column, direction, page, size) => {
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'apps.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .whereIn('topic_id', topics)
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();
    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsByCategory = async (category) => {
  try {
    const appsByCategory = await knex('apps')
      .select(
        'apps.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'apps.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
      .where({
        'topics.category_id': category,
      });
    return appsByCategory;
  } catch (error) {
    return error.message;
  }
};

const getAppsByTopic = async (topic) => {
  try {
    const appsByTopic = await knex('apps')
      .select(
        'apps.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'apps.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
      .where({ topic_id: topic });
    return appsByTopic;
  } catch (error) {
    return error.message;
  }
};

// Get apps by id
const getAppById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }
  try {
    const app = await knex('apps')
      .select(
        'apps.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'apps.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
      .where({ 'apps.id': id });
    if (app.length === 0) {
      throw new HttpError(`incorrect entry with the id of ${id}`, 404);
    }
    return app;
  } catch (error) {
    return error.message;
  }
};

// post
const createApps = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    await knex('apps').insert({
      title: body.title,
      description: body.description,
      topic_id: body.topic_id,
      user_id: user.id,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getApps,
  getAppsPagination,
  getAppsSearch,
  getAppsByCategories,
  getAppsByCategoriesSearch,
  getAppsByTopics,
  getAppsByTopicsSearch,
  getAppsByCategory,
  getAppsByTopic,
  getAppById,
  createApps,
};
