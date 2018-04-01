const User = require('./User/User.service');
const Admin = require('./Admin/Admin.service');

module.exports = function (app) {
  app.configure(User);
  app.configure(Admin);
};
