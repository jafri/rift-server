const { authenticate } = require('@feathersjs/authentication').hooks;

// async hook function
async function test(context) {
  console.log(context)
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [authenticate(['jwt-admin', 'jwt-user'])],
    get: [authenticate(['jwt-admin', 'jwt-user'])],
    create: [authenticate(['jwt-admin', 'jwt-user'])],
    update: [authenticate(['jwt-admin', 'jwt-user'])],
    patch: [authenticate(['jwt-admin', 'jwt-user'])],
    remove: [authenticate(['jwt-admin', 'jwt-user'])]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
