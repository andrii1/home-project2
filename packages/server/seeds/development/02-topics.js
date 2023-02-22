/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('SET foreign_key_checks = 0');
  await knex('topics').del();
  await knex.raw('SET foreign_key_checks = 1');
  await knex('topics').insert([
    { id: 1, title: 'Tweet ideas', category_id: 1 },
    { id: 2, title: 'Thread ideas for sales', category_id: 1 },
    { id: 3, title: 'Improving tweets', category_id: 1 },
  ]);
};
