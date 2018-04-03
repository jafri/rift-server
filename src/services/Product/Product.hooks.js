const { authenticate } = require('@feathersjs/authentication').hooks;

// async hook function
async function test(context) {
  console.log(context)
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate(['jwt-admin'])],
    update: [authenticate(['jwt-admin'])],
    patch: [authenticate(['jwt-admin'])],
    remove: [authenticate(['jwt-admin'])]
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
