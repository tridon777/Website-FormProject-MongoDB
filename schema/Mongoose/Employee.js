"use strict";
var mongoose_1 = require('mongoose');
;
var EmployeeSchema = new mongoose_1.Schema({
    ID: Number,
    FirstName: String,
    LastName: String,
});
var Employee = mongoose_1.model('Employee', EmployeeSchema);
module.exports = Employee;
//# sourceMappingURL=Employee.js.map