var Blog = require('./blog.model');
var Comment = require('./comment.model').model;

module.exports = {
    create: createComment,
    reply: replyToComment,
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

function replyToComment(req, res) {
    
}

function updateComment(req, res) {
    
}

function deleteComment(req, res) {
    
}

function viewComment(req, res) {
    Blog.findById(req.params.blogId, function (err, blog) {
        if (err) {
            res.status(500).send('Error adding comment to blog: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        }

        var comments = blog.comments.filter(function(comment) {
            return comment.id === req.params.commentId;
        });

        if (comments.length) {
            res.send(comments[0]); 
        } else {
            res.status(404).send('Comment with the provided id could not be found');
        }
    });
}

function viewComments(req, res) {
    Blog.findById(req.params.blogId, function (err, blog) {
        if (err) {
            res.status(500).send('Error adding comment to blog: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        }

        res.send(blog.comments);
    });
}