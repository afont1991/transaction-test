
import * as TestController from '../controllers/TestController';

exports.routes = (app, callback) => {

  app.post('/api/login', (req, res, next) => {
    TestController.login(req, res)
  });
  return callback(app);
};
