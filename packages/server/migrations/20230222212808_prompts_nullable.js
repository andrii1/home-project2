/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('prompts', (table) => {
    table.text('description').nullable().alter();
    table.integer('rating').nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('prompts', (table) => {
    table.text('description').notNullable().alter();
    table.integer('rating').notNullable().alter();
  });
};
