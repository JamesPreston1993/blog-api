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
    var comment = new Comment({
        content: req.body.content,
        creator: req.body.creator,
    });
    
    Blog.findById(req.params.blogId, function (err, blog) {
        if (err) {
            res.status(500).send('Error adding comment to blog: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        }

        blog.comments.push(comment);

        blog.save(function (err) {
            if (err) {
                res.status(500).send('Error adding comment to blog: ' + err);
            } else {
                res.send('Comment added.');
            }
        });
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