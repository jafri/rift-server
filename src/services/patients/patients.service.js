// Initializes the `physicians` service on path `/physicians`
const hooks = require('./patients.hooks');
const createService = require('feathers-knex');

module.exports = function (app) {
  let db = app.get('db')

  app.use('/patients', createService({
    Model: db,
    name: 'patients'
  }));
};
