/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('prompts').del();
  await knex('prompts').insert([
    {
      id: 1,
      title: 'What are the biggest misconceptions about [topic]?',
      topic_id: 1,
    },
    {
      id: 2,
      title: 'What are the most inspiring quotes about [topic]?',
      topic_id: 1,
    },
    {
      id: 3,
      title:
        'What are the most effective ways to [solve a problem related to the topic]?',
      topic_id: 1,
    },
  ]);
};
