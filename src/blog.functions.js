var Blog = require('./blog.model');

module.exports = {
    create: createBlog,
    update: updateBlog,
    delete: deleteBlog,
    view: viewBlog,
    viewMany: viewBlogs
};

function createBlog (newBlog, onSuccess, onFail) {
    var blog = new Blog({
        title: newBlog.title,
        content: newBlog.content,
        creator: newBlog.creator
    });

    blog.save(function (err) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error updating blog: ' + err
            });
        } else {
            onSuccess('Blog created.');
        }
    });
}

function updateBlog (id, newBlog, onSuccess,onFail) {
    Blog.findById(id, function (err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error updating blog: ' + err
            });
        }
    
        if (!blog) {
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        } else {
            var triggerUpdate = blog.updateProperties(newBlog);

            if (triggerUpdate) {
                blog.markAsUpdated();
                blog.save(function (err, updatedBlog) {
                    if (err) {
                        onFail({
                            status: 500,
                            message: 'Error updating blog: ' + err
                        });
                    } else {
                        onSuccess('Blog updated.');
                    }
                });
            } else {
                onSuccess('Update not required.');
            }
        }
    });
}

function deleteBlog (id, onSuccess, onFail) {
    if (typeof id === 'undefined') {
        onFail({
            status: 400,
            message: 'An id was not provided'
        });
    }

    Blog.findByIdAndRemove(id, function(err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'Error deleting blog: ' + err
            });
        }

        if (!blog) { 
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        } else {
            onSuccess('Blog deleted.');
        }
    });
}

function viewBlog (id, onSuccess, onFail) {
    if (typeof id === 'undefined') {
        onFail({
            status: 400,
            message: 'An id was not provided'
        });
    }

    Blog.findById(id, '-comments').populate('creator').exec(function (err, blog) {
        if (err) {
            onFail({
                status: 500,
                message: 'An error occurred retrieving blogs: ' + err
            });
        }

        if (!blog) {
            onFail({
                status: 404,
                message: 'Blog with the provided id could not be found'
            });
        } else {
            onSuccess(blog);
        }
    })
}

function viewBlogs (queryParams, onSuccess, onFail) {
    var query = Blog.find({}, '-comments').populate('creator');

    // Filter by username
    if (typeof queryParams.creator !== 'undefined') {
        var creator = decodeURIComponent(queryParams.creator);
        query.where({ creator: creator });       
    }

    // Filter by start date
    if (typeof queryParams.startDate !== 'undefined') {
        var milliseconds = parseInt(queryParams.startDate);
        if (!isNaN(milliseconds)) {
            var startDate = new Date(milliseconds);
            query.where({ createdOn: { $gte: startDate } });
        }     
    }

    // Filter by end date
    if (typeof queryParams.endDate !== 'undefined') {
        var milliseconds = parseInt(queryParams.endDate);
        if (!isNaN(milliseconds)) {
            var endDate = new Date(milliseconds);
            query.where({ createdOn: { $lte: endDate } });
        }     
    }

    // Add limit to search
    if (typeof queryParams.limit !== 'undefined') {
        var limit = parseInt(queryParams.limit);
        if (!isNaN(limit)) {
            query.limit(limit);
        }        
    }

    query.exec(function (err, blogs) {
        if (err) {
            onFail({
                status: 500,
                message: 'An error occurred retrieving blogs: ' + err
            });
        } else {
            onSuccess(blogs);
        }
    });
}