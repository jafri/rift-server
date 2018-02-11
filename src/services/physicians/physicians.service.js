// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');
const createModel = require('../../models/physicians.model');
const hooks = require('./physicians.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'physicians',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/physicians', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('physicians');

  service.hooks(hooks);
};
