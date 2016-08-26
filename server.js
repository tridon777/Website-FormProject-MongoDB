"use strict";
var Express = require("express");
var BodyParser = require("body-parser");
var Employee = require('./schema/Mongoose/Employee');
var router = Express();
var options = { promiseLibrary: require('bluebird') };
var Promise = require('bluebird');
var Mongoose = require('mongoose');
Mongoose = Promise.promisifyAll(Mongoose);
var db = Mongoose.connect("mongodb://localhost/mydb", options);
router.use(BodyParser.json());
router.use(BodyParser.urlencoded({
    extended: true
}));
var server = router.listen(3000, function () {
    console.log('Server listening on port 3000');
});
router.post('/api/employee', function (req, res) {
    var newEmployee = new Employee(req.body);
    newEmployee.save(function (err) {
        err ? res.json({ info: 'error during Employee create', error: err }) : res.json({ info: 'Employee saved successfully', data: newEmployee });
    });
});
router.get('/api/employee', function (req, res) {
    Employee.find(function (err, Employees) {
        err ? res.json({ info: 'error during find Employees', error: err }) : res.json({ info: 'Employees found successfully', data: Employees });
    });
});
//# sourceMappingURL=server.js.map