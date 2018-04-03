// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Platform.hooks');
const Platform = require('./Platform.class')

module.exports = function (app) {
  app.use('/Platform', new Platform());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Platform');

  service.hooks(hooks);
};
