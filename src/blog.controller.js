var Blog = require('./blog.model');

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
            res.send('Error saving blog: ' + err);
        } else {
            res.send('Blog created.');
        }
    });
}

function updateBlog (req, res) {
    
}

function deleteBlog (req, res) {
    
}

function viewBlog (req, res) {
    
}

function viewBlogs (req, res) {
    
}