const knex = require('knex');

module.exports = function(app) {
  // Database connector
  const db = knex(app.get("database"));

  // Creat uuid extension
  // db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  // Create the Physicians Table
  db.schema.withSchema('ehr').hasTable('physicians').then(function(exists) {
    if (!exists) {
      return db.schema.withSchema('ehr').createTable('physicians', function(table) {
        table.uuid('physician_id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('middle_name', 100);
        table.string('email');
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
    }
  });

  // Create the Physicians Login Table
  db.schema.withSchema('ehr').hasTable('physician_logins').then(function(exists) {
    if (!exists) {
      return db.schema.withSchema('ehr').createTable('physician_logins', function(table) {
        table.string('username', 100).primary().notNullable();
        table.string('password', 100).notNullable();
        table.uuid('physician_id').defaultTo(db.raw('uuid_generate_v1mc()')).references('physician_id').inTable('physicians');
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
    }
  });

  // Create the Patients Table
  db.schema.withSchema('ehr').hasTable('patients').then(function(exists) {
    if (!exists) {
      return db.schema.withSchema('ehr').createTable('patients', table => {
        table.uuid('patient_id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('middle_name', 100);
        table.string('personal_health_care_number', 100);
        table.date('date_of_birth');
        table.boolean('research_consent').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now())
      });
    }
  });

  // Create the Patient Records Table
  db.schema.withSchema('ehr').hasTable('patient_reports').then(function(exists) {
    if (!exists) {
      return db.schema.withSchema('ehr').createTable('patient_reports', table => {
        table.uuid('patient_report_id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
        table.string('report_type');
        table.string('patient_id').references('patient_id').inTable('patients');
        table.string('physician_id').references('physician_id').inTable('physicians');
        table.jsonb('form_json');
        table.string('password');
        table.timestamp('created_at').defaultTo(db.fn.now())
      });
    }
  });

  app.set('db', db);
};
