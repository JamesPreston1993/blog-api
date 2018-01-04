var blogFunctions = require('./blog.functions');

module.exports = {
    create: createBlog,
    update: updateBlog,
    delete: deleteBlog,
    view: viewBlog,
    viewByUrl: viewBlogByUrl,
    viewMany: viewBlogs
};

function createBlog (req, res) {
    blogFunctions.create(req.body, function (data) {
        res.send(data);
    }, function (err) {
        res.status(err.status).send(err.message);
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

function viewBlogByUrl (req, res) {
    blogFunctions.viewByUrl(req.params.id, function (data) {
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