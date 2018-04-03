// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Fiat.hooks');
const Fiat = require('./Fiat.class')

module.exports = function (app) {
  app.use('/Fiat', new Fiat());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Fiat');

  service.hooks(hooks);
};
