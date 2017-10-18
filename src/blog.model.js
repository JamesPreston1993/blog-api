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
    createdOn: { type: Date, default: Date.now },
    lastUpdatedOn: { type: Date }
});

BlogSchema.methods.markAsUpdated = function () {
    this.lastUpdatedOn = Date.now();
};

BlogSchema.methods.updateProperties = function (newBlog) {
    var changesMade = false;
    
    if (typeof newBlog.title !== 'undefined') {
        changesMade = true;
        this.title = newBlog.title
    }
    
    if (typeof newBlog.content !== 'undefined') {
        changesMade = true;
        this.content = newBlog.content
    }

    return changesMade;
};

module.exports = mongoose.model('Blog', BlogSchema);