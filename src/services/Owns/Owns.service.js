// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Owns.hooks');
const Owns = require('./Owns.class')

module.exports = function (app) {
  app.use('/Owns', new Owns());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Owns');

  service.hooks(hooks);
};
