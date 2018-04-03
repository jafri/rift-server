// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Cryptocurrency.hooks');
const Cryptocurrency = require('./Cryptocurrency.class')

module.exports = function (app) {
  app.use('/Cryptocurrency', new Cryptocurrency());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Cryptocurrency');

  service.hooks(hooks);
};
