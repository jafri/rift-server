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

  let removed = await app.service("Product").remove('BTC')
  console.log(removed)

  let product = await app.service("Product").create({Ticker: 'BTC', Name: 'Bitcoin'})
  console.log(product)
});
