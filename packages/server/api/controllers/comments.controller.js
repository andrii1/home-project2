const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

// get all comments
const getAllComments = async () => {
  try {
    const allComments = await knex.select().table('comments');

    if (allComments.length === 0) {
      throw new HttpError(`No reviews`, 404);
    }
    return allComments;
  } catch (error) {
    if (error instanceof HttpError) {
      return error.message;
    }
  }
};

// get comment by prompt id
const getCommentsByPromptId = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const comments = await knex('comments')
      .join('users', 'comments.user_id', '=', 'users.id')
      .where('comments.prompt_id', '=', `${id}`);

    return comments;
  } catch (error) {
    return error.message;
  }
};
// get by user-id
const getFavoritesByUserId = async (token) => {
  const userUid = token.split(' ')[1];
  const user = (await knex('users').where({ uid: userUid }))[0];

  if (!token) {
    throw new HttpError('There are not users', 401);
  }

  try {
    const favorites = await knex('prompts')
      .select('prompts.*', 'favorites.id as favoritesID')
      .leftJoin('favorites', function () {
        this.on('prompts.id', '=', 'favorites.prompt_id');
      })
      .where('favorites.user_id', '=', `${user.id}`);

    if (favorites.length === 0) {
      throw new HttpError(
        `There are no favorites available with this user`,
        404,
      );
    }

    return favorites;
  } catch (error) {
    return error.message;
  }
};

// post
const createComments = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    await knex('comments').insert({
      user_id: user.id,
      prompt_id: body.prompt_id,
      content: body.content,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

// delete

const deleteComments = async (token, commentId) => {
  const userUid = token.split(' ')[1];
  const user = (await knex('users').where({ uid: userUid }))[0];
  if (!user) {
    throw new HttpError('User not found', 401);
  }
  try {
    const deletedComment = await knex('comments')
      .where({ id: commentId, user_id: user.id })
      .del();
    if (deletedComment === 0) {
      throw new HttpError('The comments ID you provided does not exist.', 400);
    } else {
      return {
        successful: true,
      };
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllComments,
  getCommentsByPromptId,
  createComments,
  deleteComments,
};
