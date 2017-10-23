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
    Blog.findById(req.params.blogId, function (err, blog) {
        if (err) {
            res.status(500).send('Error updating comment: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        }

        var comment = blog.comments.id(req.params.commentId);

        if (!comment) {
            res.status(404).send('Comment with the provided id could not be found');
        } else {
            comment.updateContent(req.body.content);
            blog.save(function (err) {
                if (err) {
                    res.status(500).send('Error updating comment: ' + err);
                } else {
                    res.send('Updated comment.');
                }
            });
        }
    });
}

function deleteComment(req, res) {
    Blog.findById(req.params.blogId, function (err, blog) {
        if (err) {
            res.status(500).send('Error removing comment: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        }

        var comment = blog.comments.id(req.params.commentId);

        if (!comment) {
            res.status(404).send('Comment with the provided id could not be found');
        } else {
            comment.remove();
            blog.save(function (err) {
                if (err) {
                    res.status(500).send('Error removing comment: ' + err);
                } else {
                    res.send('Removed comment.');
                }
            });
        }
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