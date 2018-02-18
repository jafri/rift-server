// Initializes the `physicians` service on path `/physicians`
const hooks = require('./physicianLogins.hooks');
const createService = require('feathers-knex');

module.exports = function (app) {
  let db = app.get('db')

  app.use('/physicianLogins', createService({
    Model: db,
    name: 'physicianLogins'
  }));
};
