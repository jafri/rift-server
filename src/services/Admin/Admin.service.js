// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Admin.hooks');
const Admin = require('./Admin.class')

module.exports = function (app) {
  app.use('/Admin', new Admin());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Admin');

  service.hooks(hooks);
};
