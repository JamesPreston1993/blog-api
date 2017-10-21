var Blog = require('./blog.model');
var Comment = require('./comment.model').model;

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

        var comment =  blog.comments.id(req.params.commentId);

        if (!comment) {
            res.status(404).send('Comment with the provided id could not be found');
        } else {
            res.send(comment); 
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