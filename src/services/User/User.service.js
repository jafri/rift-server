// Initializes the `physicians` service on path `/physicians`
const hooks = require('./User.hooks');
const User = require('./User.class')

module.exports = function (app) {
  app.use('/User', new User());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('User');

  service.hooks(hooks);
};
