"use strict";
var mongoose_1 = require('mongoose');
;
var FormSchema = new mongoose_1.Schema({
    ID: Number,
    Name: String
});
var Form = mongoose_1.model('Form', FormSchema);
module.exports = Form;
//# sourceMappingURL=Form.js.map