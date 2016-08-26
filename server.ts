import * as Express from "express";
import * as BodyParser from "body-parser";


import * as Employee from './schema/Mongoose/Employee';


const router = Express();


const options = { promiseLibrary: require('bluebird') };
const Promise = require('bluebird');
let Mongoose = require('mongoose');
Mongoose = Promise.promisifyAll(Mongoose);

let db = Mongoose.connect("mongodb://localhost/mydb", options);

router.use(BodyParser.json());
router.use(BodyParser.urlencoded({
    extended: true
}));

const server = router.listen(3000, function ()  {
    console.log('Server listening on port 3000');
});

router.post('/api/employee', function (req, res)  {
    let newEmployee = new Employee(req.body);
    newEmployee.save((err)=>{
        err ? res.json({info: 'error during Employee create', error: err}) : res.json({info: 'Employee saved successfully', data: newEmployee});
    });
});

router.get('/api/employee', function (req, res) {
    Employee.find((err, Employees) => {
        err ? res.json({info: 'error during find Employees', error: err}) : res.json({info: 'Employees found successfully', data: Employees});
    });
});