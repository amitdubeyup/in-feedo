const Express = require('express');
const Router = Express.Router();

const TasksRoutes = require('./tasks.routes');

Router.use('/tasks', TasksRoutes);

Router.get('/', function (req, res) {
  return res.send({
    success: true,
    message: 'Welcome to the coolest API on the earth!',
  });
});

module.exports = Router;