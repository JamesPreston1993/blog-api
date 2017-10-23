var Blog = require('./blog.model');
var Comment = require('./comment.model').model;

module.exports = {
    create: createComment,
    update: updateComment,
    delete: deleteComment,
    view: viewComment,
    viewMany: viewComments
};

function createComment (blogId, newComment, onSuccess, onFail) {
    var comment = new Comment({
        content: newComment.content,
        creator: newComment.creator,
    });
    
    Blog.findById(blogId, function (err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error adding comment to blog: ' + err
            });
        }

        if (!blog) {
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        }

        blog.comments.push(comment);

        blog.save(function (err) {
            if (err) {
                onFail({
                    status: 500,
                    message: 'Error adding comment to blog: ' + err
                });
            } else {
                onSuccess('Comment added.');
            }
        });
    });
}

function updateComment (blogId, commentId, newComment, onSuccess, onFail) {
    Blog.findById(blogId, function (err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error updating comment: ' + err
            });
        }

        if (!blog) {
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        }

        var comment = blog.comments.id(commentId);

        if (!comment) {
            onFail({
                status: 404,
                message: 'Comment with the provided id could not be found'
            });
        } else {
            comment.updateContent(newComment);
            blog.save(function (err) {
                if (err) {
                    onFail({
                        status: 500,
                        message: 'Error updating comment: ' + err
                    });
                } else {
                    onSuccess('Updated comment.');
                }
            });
        }
    });
}

function deleteComment (blogId, commentId, onSuccess, onFail) {
    Blog.findById(blogId, function (err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error removing comment: ' + err
            });
        }

        if (!blog) { 
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        }

        var comment = blog.comments.id(commentId);

        if (!comment) {
            onFail({
                status: 404,
                message: 'Comment with the provided id could not be found'
            });
        } else {
            comment.remove();
            blog.save(function (err) {
                if (err) {
                    onFail({
                        status: 500,
                        message: 'Error removing comment: ' + err
                    });
                } else {
                    onSuccess('Removed comment.');
                }
            });
        }
    });
}

function viewComment (blogId, commentId, onSuccess, onFail) {
    Blog.findById(blogId, function (err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error adding comment to blog: ' + err
            });
        }

        if (!blog) {
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        }

        var comment =  blog.comments.id(commentId);

        if (!comment) {
            onFail({
                status: 404,
                message: 'Comment with the provided id could not be found'
            });
        } else {
            onSuccess(comment); 
        }
    });
}

function viewComments (blogId, onSuccess, onFail) {
    Blog.findById(blogId, function (err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error adding comment to blog: ' + err
            });
        }

        if (!blog) {
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        }

        onSuccess(blog.comments);
    });
}