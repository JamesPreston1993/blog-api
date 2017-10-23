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
    blogFunctions.update(req.params.id, req.body, function (data) {
        res.send(data);
    }, function (err) {
        res.status(err.status).send(err.message);
    });
}

function deleteBlog (req, res) {
    blogFunctions.delete(req.params.id, function (data) {
        res.send(data);
    }, function (err) {
        res.status(err.status).send(err.message);
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