// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Currency.hooks');
const Currency = require('./Currency.class')

module.exports = function (app) {
  app.use('/Currency', new Currency());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Currency');

  service.hooks(hooks);
};
