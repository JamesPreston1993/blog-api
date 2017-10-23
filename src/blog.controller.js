var Blog = require('./blog.model');
var blogFunctions = require('./blog.functions');

module.exports = {
    create: createBlog,
    update: updateBlog,
    delete: deleteBlog,
    view: viewBlog,
    viewMany: viewBlogs
};

function createBlog (req, res) {
    var blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        creator: req.body.creator
    });

    blog.save(function (err) {
        if (err) {
            res.status(500).send('Error saving blog: ' + err);
        } else {
            res.send('Blog created.');
        }
    });
}

function updateBlog (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            res.status(500).send('Error updating blog: ' + err);
        }
    
        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        } else {
            var triggerUpdate = blog.updateProperties(req.body);

            if (triggerUpdate) {
                blog.markAsUpdated();
                blog.save(function (err, updatedBlog) {
                    if (err) {
                        res.status(500).send('Error updating blog: ' + err);
                    } else {
                        res.send('Blog updated.');
                    }
                });
            } else {
                res.send('Update not required.');
            }
        }
    });
}

function deleteBlog (req, res) {
    if (typeof req.params.id === 'undefined') {
        res.status(400).send('An id was not provided');
    }

    Blog.findByIdAndRemove(req.params.id, function(err, blog) {
        if (err) {
            res.status(500).send('Error deleting blog: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        } else {
            res.send('Blog deleted.');
        }
    });
}

function viewBlog (req, res) {
    blogFunctions.view(req.params.id, function (data) {
        res.send(data);
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}

function viewBlogs (req, res) {
    blogFunctions.viewMany(req.query, function (data) {
        res.send(data);
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}