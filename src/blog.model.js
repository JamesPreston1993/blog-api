var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: String, required: true }, 
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);