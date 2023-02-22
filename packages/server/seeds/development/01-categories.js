/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('SET foreign_key_checks = 0');
  await knex('categories').truncate();
  await knex.raw('SET foreign_key_checks = 1');
  await knex('categories').insert([
    { id: 1, title: 'Twitter' },
    { id: 2, title: 'Email Marketing' },
    { id: 3, title: 'Affiliate Marketing' },
  ]);
};
