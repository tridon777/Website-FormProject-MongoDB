"use strict";
var Express = require("express");
var BodyParser = require("body-parser");
var Employee = require('./schema/Mongoose/Employee');
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:81');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});
var router = Express.Router();
var options = { promiseLibrary: require('bluebird') };
var Promise = require('bluebird');
var Mongoose = require('mongoose');
Mongoose = Promise.promisifyAll(Mongoose);
var db = Mongoose.connect("mongodb://localhost/mydb", options);
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
router.post('/employee', function (req, res) {
    var newEmployee = new Employee(req.body);
    newEmployee.save(function (err) {
        err ? res.json({ info: 'error during Employee create', error: err }) : res.json({ info: 'Employee saved successfully', data: newEmployee });
    });
});
router.get('/employee', function (req, res) {
    Employee.find(function (err, Employees) {
        err ? res.json({ info: 'error during find Employees', error: err }) : res.json({ info: 'Employees found successfully', data: Employees });
    });
});
app.use('/api', router);
var server = app.listen(3000, function () {
    console.log('Server listening on port 3000 testing');
});
//# sourceMappingURL=server.js.map