/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('prompts', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('description').nullable();
    table.decimal('rating').nullable();
    table.integer('topic_id').unsigned();
    table.foreign('topic_id').references('id').inTable('topics');
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('prompts');
};
