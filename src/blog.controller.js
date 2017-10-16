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
            res.status(500).send('Error saving blog: ' + err);
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
    if (typeof req.params.id === 'undefined') {
        res.status(400).send('An id was not provided');
    }

    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            res.status(500).send('An error occured retrieving blog: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        } else {
            res.send(blog);
        }
    })
}

function viewBlogs (req, res) {
    
}