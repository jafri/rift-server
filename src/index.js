/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', async () => {
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)

  // TODO Testing only
  console.log("TESTING")
  //let syed = await app.service("User").remove('sye')
  //let syed = await app.service("User").create({Username: 'kalum', Password: '33'})
  
  //console.log(syed)
});
