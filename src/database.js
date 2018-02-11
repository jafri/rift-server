const knex = require('knex');

module.exports = function(app) {
  // Database connector
  const db = knex(app.get("database"));

  // Create the Physicians
  db.schema.createTable('physicians', table => {
    table.increments('id');
    table.string('username');

    table.string('password');
  });

  app.set('db', db);
};
