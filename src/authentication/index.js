const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const Verifier = require('./verifier.js');

module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));

  app.configure(jwt({
    name: 'jwt-admin',
    entity: 'admin',
    service: 'Admin'
  }));

  app.configure(jwt({
    name: 'jwt-user',
    entity: 'user',
    service: 'User'
  }));

  app.configure(local({
    name: 'local-admin',
    entity: 'admin',
    service: 'Admin',
    usernameField: 'Username',
    passwordField: 'Password'
  }));

  app.configure(local({
    name: 'local-user',
    entity: 'user',
    service: 'User',
    usernameField: 'Username',
    passwordField: 'Password',
    Verifier: Verifier
  }));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(['jwt-admin', 'local-admin', 'local-user'])
      ],
      remove: [
        authentication.hooks.authenticate(['jwt-admin', 'jwt-user', 'local-admin', 'local-user'])
      ]
    }
  });
};
