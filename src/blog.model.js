var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notEmptyValidator = [
    function (val) {
        return val.trim().length > 0;
    }, 'Cannot be empty.'
];

var BlogSchema = new Schema({
    title: { type: String, required: true, validate: notEmptyValidator },
    content: { type: String, required: true, validate: notEmptyValidator },
    creator: { type: String, required: true, validate: notEmptyValidator }, 
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);