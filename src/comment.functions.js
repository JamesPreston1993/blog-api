var Blog = require('./blog.model');
var Comment = require('./comment.model').model;

module.exports = {
    create: createComment,
    update: updateComment,
    delete: deleteComment,
    view: viewComment,
    viewMany: viewComments
};

function createComment () {
    
}

function updateComment () {

}

function deleteComment () {

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