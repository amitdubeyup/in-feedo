const Express = require('express');
const Router = Express.Router();
const Controller = require('../controllers/tasks');

Router.post('/create', Controller.createTask);
Router.post('/update', Controller.updateTask);
Router.get('/fetch', Controller.fetchTask);
Router.get('/metric', Controller.metricTask);

Router.get('/', function (req, res) {
    return res.send({
        success: true,
        message: 'Welcome to the coolest API on the earth!',
    });
});


module.exports = Router;