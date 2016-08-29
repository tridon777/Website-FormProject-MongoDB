import { CForm } from '../POCO/CForm';
import { Document, Schema, model } from 'mongoose';

interface CFormModel extends CForm, Document{};
const FormSchema = new Schema({
    ID: Number,
    Name: String
});

let Form = model<CFormModel>('Form',FormSchema);

export = Form;