var blog = require('./blog.model');
var blogController = require('./blog.controller');
var blogFunctions = require('./blog.functions');
var comment = require('./comment.model');
var commentController = require('./comment.controller');
var commentFunctions = require('./comment.functions');

module.exports = {
    blog: {
        model: blog.model,
        schema: blog.schema,
        controller: blogController,
        functions: blogFunctions
    },
    comment: {
        model: comment.model,
        schema: comment.schema,
        controller: commentController,
        functions: commentFunctions
    }
};