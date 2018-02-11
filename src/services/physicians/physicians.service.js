// Initializes the `physicians` service on path `/physicians`
const hooks = require('./physicians.hooks');
const createService = require('feathers-knex');

module.exports = function (app) {
  let db = app.get('db')
  
  app.use('/physicians', createService({
    Model: db,
    name: 'physicians'
  }));
};
