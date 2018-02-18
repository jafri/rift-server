const patientReports = require('./patientReports/patientReports.service');
const patients = require('./patients/patients.service');
const physicianLogins = require('./physicianLogins/physicianLogins.service');
const physicians = require('./physicians/physicians.service');

module.exports = function (app) {
  app.configure(patientReports);
  app.configure(patients);
  app.configure(physicianLogins);
  app.configure(physicians);
};
