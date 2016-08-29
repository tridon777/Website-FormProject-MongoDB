import * as Express from "express";
import * as BodyParser from "body-parser";


import * as Employee from './schema/Mongoose/Employee';
import * as Form  from './schema/Mongoose/Form';



const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

app.use(function(req,res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = Express.Router();



const options = { promiseLibrary: require('bluebird') };
const Promise = require('bluebird');
let Mongoose = require('mongoose');
Mongoose = Promise.promisifyAll(Mongoose);

let db = Mongoose.connect("mongodb://localhost/mydb", options);

router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



router.post('/employee', (req, res) => {
    let newEmployee = new Employee(req.body);
    newEmployee.save((err)=>{
        err ? res.json({info: 'error during Employee create', error: err}) : res.json({info: 'Employee saved successfully', data: newEmployee});
    });
});

router.get('/employee', (req, res) => {
    Employee.find((err, Employees) => {
        err ? res.json({info: 'error during find Employees', error: err}) : res.json({info: 'Employees found successfully', data: Employees});
    });
});

router.get('/forms',(req,res) =>{
    Form.find((err,Forms)=>{
        err ? res.json({info: 'error during find forms', error: err}) : res.json(Forms);
    })
});


app.use('/api', router);

const server = app.listen(3001, () => {
    console.log('Server listening on port 3001 testing');
});