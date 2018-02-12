const knex = require('knex');

module.exports = function(app) {
  // Database connector
  const db = knex(app.get("database"));

  // Creat uuid extension
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  knex.schema.withSchema('ehr').hasTable('physicians').then(function(exists) {
    if (!exists) {
      return knex.schema.withSchema('ehr').createTable('physicians', function(table) {
        table.uuid('physician_id').defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
        table.string('first_name', 100);
        table.string('last_name', 100);
        table.string('middle_name', 100);
        table.string('email');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
    }
  });

  knex.schema.withSchema('ehr').hasTable('physician_logins').then(function(exists) {
    if (!exists) {
      return knex.schema.withSchema('ehr').createTable('physician_logins', function(table) {
        t.increments('id').primary();
        t.string('first_name', 100);
        t.string('last_name', 100);
        t.text('bio');
      });
    }
  });

  app.set('db', db);
};
