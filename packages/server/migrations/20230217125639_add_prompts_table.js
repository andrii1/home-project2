/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('prompts', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.decimal('rating').notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('category_id').unsigned();
    table.foreign('category_id').references('id').inTable('categories');
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
