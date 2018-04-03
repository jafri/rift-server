const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

// async hook function
async function test(context) {
  console.log(context)
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt-user')],
    get: [authenticate('jwt-user')],
    create: [hashPassword({passwordField: 'Password'})],
    update: [authenticate('jwt-user')],
    patch: [authenticate('jwt-user')],
    remove: [authenticate('jwt-admin')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('Password')
    ],
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
