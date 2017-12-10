import { Router } from 'express';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/list', (req, res, next) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', { title });
});

routes.get('/test', async (req, res, next) => {
  let db = req.app.get('db');

  if(db === null){
    next()
  }

  try{
    await db.query("INSERT INTO physician_authentication (username, password) VALUES (${username}, ${password})", {
      username: "test7",
      password: "omg it works"
    });

    let tests = await db.query("SELECT * from physician_authentication WHERE username = ${username}", { username: "test7" })

    console.log("Passed: ", tests); // eslint-disable-line no-console
  } catch (err) {
    console.log("Error: ", err); // eslint-disable-line no-console
  }

  next()
});
export default routes;
