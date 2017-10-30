var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema =  require('./comment.model').schema;
var userSchemaName = process.env.USER_SCHEMA_NAME || 'User';

var notEmptyValidator = [
    function (val) {
        return val.trim().length > 0;
    }, 'Cannot be empty.'
];

var BlogSchema = new Schema({
    title: { type: String, required: true, validate: notEmptyValidator },
    content: { type: String, required: true, validate: notEmptyValidator },
    creator: { type: Schema.Types.ObjectId, required: true, ref: userSchemaName },
    createdOn: { type: Date, default: Date.now },
    lastUpdatedOn: { type: Date },
    comments: [CommentSchema]
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


module.exports = {
    model: mongoose.model('Blog', BlogSchema),
    schema: BlogSchema
};