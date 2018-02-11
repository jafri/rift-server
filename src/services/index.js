const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const physicians = require('./physicians/physicians.service');

module.exports = function (app) {
  app.configure(messages);
  app.configure(users);
  app.configure(physicians);
};
