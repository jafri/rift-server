const physicians = require('./physicians/physicians.service');

module.exports = function (app) {
  app.configure(physicians);
};
