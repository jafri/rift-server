// Initializes the `patientReports` service on path `/patientReports`
const hooks = require('./patientReports.hooks');
const createService = require('feathers-knex');

module.exports = function (app) {
  let db = app.get('db')

  app.use('/patientReports', createService({
    Model: db,
    name: 'patientReports'
  }));
};
