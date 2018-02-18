const knex = require('knex');


module.exports = function(app) {
  // Database connector
  const db = knex(app.get("database"));

  // Creat uuid extension
  // db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  // Create the Physicians Table
  db.schema.hasTable('physicians').then(function(exists) {
    if (!exists) {
      return db.schema.createTable('physicians', function(table) {
        table.uuid('id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('middle_name', 100);
        table.string('email');
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
    }
  });

  // Create the Physicians Login Table
  db.schema.hasTable('physicianLogins').then(function(exists) {
    if (!exists) {
      return db.schema.createTable('physicianLogins', function(table) {
        table.string('username', 100).primary().notNullable();
        table.string('password', 100).notNullable();
        table.uuid('id').defaultTo(db.raw('uuid_generate_v1mc()')).references('id').inTable('physicians');
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
    }
  });

  // Create the Patients Table
  db.schema.hasTable('patients').then(function(exists) {
    if (!exists) {
      return db.schema.createTable('patients', table => {
        table.uuid('id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
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
  db.schema.hasTable('patientReports').then(function(exists) {
    if (!exists) {
      return db.schema.createTable('patientReports', table => {
        table.uuid('id').defaultTo(db.raw('uuid_generate_v1mc()')).primary();
        table.string('report_type');
        table.uuid('patient_id').references('id').inTable('patients');
        table.uuid('physician_id').references('id').inTable('physicians');
        table.jsonb('form_json');
        table.string('password');
        table.timestamp('created_at').defaultTo(db.fn.now())
      });
    }
  });

  app.set('db', db);
};
