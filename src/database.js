const knex = require('knex');

module.exports = function(app) {
  // Database connector
  console.log(app.get("database"));
  const db = knex(app.get("database"));

  // Create the Patients
  db.schema.createTable('patients', table => {
    table.increments('id');
    table.string('username');

    table.string('password');
  });

  app.set('db', db);
};
