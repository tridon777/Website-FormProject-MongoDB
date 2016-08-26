import { CEmployee } from '../POCO/CEmployee';
import { Document, Schema, model } from 'mongoose';

interface CEmployeeModel extends CEmployee, Document{};
const EmployeeSchema = new Schema({
    ID: Number,
    FirstName: String,
    LastName: String,
});

let Employee = model<CEmployeeModel>('Employee',EmployeeSchema);

export = Employee;