var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchemaName = process.env.USER_SCHEMA_NAME || 'User';

var notEmptyValidator = [
    function (val) {
        return val.trim().length > 0;
    }, 'Cannot be empty.'
];

var CommentSchema = new Schema({
    content: { type: String, required: true, validate: notEmptyValidator },
    creator: { type: Schema.Types.ObjectId, required: true, ref: userSchemaName },
    createdOn: { type: Date, default: Date.now },
    lastUpdatedOn: { type: Date }
});

CommentSchema.add({
    replies: [CommentSchema]
});

module.exports = CommentSchema;