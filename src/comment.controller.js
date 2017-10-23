var Blog = require('./blog.model');
var Comment = require('./comment.model').model;
var commentFunctions = require('./comment.functions');

module.exports = {
    create: createComment,
    update: updateComment,
    delete: deleteComment,
    view: viewComment,
    viewMany: viewComments
};

function createComment(req, res) {
    commentFunctions.create(req.params.blogId, req.body, function (data) {
        res.send(data)
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}

function updateComment(req, res) {
    commentFunctions.update(req.params.blogId, req.params.commentId, req.body, function (data) {
        res.send(data)
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}

function deleteComment(req, res) {
    commentFunctions.delete(req.params.blogId, req.params.commentId, function (data) {
        res.send(data)
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}

function viewComment(req, res) {
    commentFunctions.view(req.params.blogId, req.params.commentId, function (data) {
        res.send(data)
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}

function viewComments(req, res) {
    commentFunctions.viewMany(req.params.blogId, function (data) {
        res.send(data)
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}