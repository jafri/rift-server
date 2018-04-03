// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Exchange.hooks');
const Exchange = require('./Exchange.class')

module.exports = function (app) {
  app.use('/Exchange', new Exchange());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Exchange');

  service.hooks(hooks);
};
