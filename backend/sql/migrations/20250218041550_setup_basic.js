/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.text('username').unique().notNullable();
        table.text('password').notNullable();
    });

    await knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.text('title').notNullable();
        table.text('description');
        table.boolean('is_complete').defaultTo(false);
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });

    await knex.raw('CREATE INDEX idx_tasks_user_id ON tasks(user_id)');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('tasks');
    await knex.schema.dropTableIfExists('users');
};
