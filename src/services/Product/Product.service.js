// Initializes the `physicians` service on path `/physicians`
const hooks = require('./Product.hooks');
const Product = require('./Product.class')

module.exports = function (app) {
  app.use('/Product', new Product());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('Product');

  service.hooks(hooks);
};
