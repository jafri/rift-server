const knex = require('knex');

module.exports = function(app) {
  // Database connector
  const db = knex(app.get("database"));

  // Create the Patients Table
  db.schema.withSchema('ehr').hasTable('patients').then(function(exists) {
    if (!exists) {
      createTable('patients', table => {
        table.increments('id').primary();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('middle_name', 100);
        table.string('personal_health_care_number', 100);
        table.date('date_of_birth');
        table.boolean('research_consent').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
      });
    }
  });

  // Create the Patient Records Table
  db.schema.withSchema('ehr').hasTable('patients').then(function(exists) {
    if (!exists) {
      db.schema.withSchema('ehr').createTable('patient_reports', table => {
        table.increments('id').primary();
        table.string('report_type');
        table.string('patient_id').references('patient_id').inTable('patients');
        table.string('physician_id').references('physician_id').inTable('physicians');
        table.jsonb('form_json');
        table.string('password');
        table.timestamp('created_at').defaultTo(knex.fn.now())
      });
    }
  });
  app.set('db', db);
};
