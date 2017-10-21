var blogModel = require('./blog.model');
var blogController = require('./blog.controller');
var comment = require('./comment.model');
var commentController = require('./comment.controller');

module.exports = {
    blog: {
        model: blogModel,
        controller: blogController
    },
    comment: {
        model: comment.model,
        schema: comment.schema,
        controller: commentController
    }
};