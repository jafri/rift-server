const User = require('./User/User.service');
const Admin = require('./Admin/Admin.service');

const Product = require('./Product/Product.service');
const Owns = require('./Owns/Owns.service');

module.exports = function (app) {
  // Auth
  app.configure(User);
  app.configure(Admin);

  // Product
  app.configure(Product);

  app.configure(Owns);
};
