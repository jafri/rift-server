// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Bank.hooks');
const Bank = require('./Bank.class')

module.exports = function (app) {
  app.use('/Bank', new Bank());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Bank');

  service.hooks(hooks);
};
