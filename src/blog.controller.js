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
    var query = Blog.find();

    // Filter by username
    if (typeof req.query.creator !== 'undefined') {
        var creator = decodeURIComponent(req.query.creator);
        query.where({ creator: creator });       
    }

    // Filter by start date
    if (typeof req.query.startDate !== 'undefined') {
        var milliseconds = parseInt(req.query.startDate);
        if (!isNaN(milliseconds)) {
            var startDate = new Date(milliseconds);
            query.where({ createdOn: { $gte: startDate } });
        }     
    }

    // Filter by end date
    if (typeof req.query.endDate !== 'undefined') {
        var milliseconds = parseInt(req.query.endDate);
        if (!isNaN(milliseconds)) {
            var endDate = new Date(milliseconds);
            query.where({ createdOn: { $lte: endDate } });
        }     
    }

    // Add limit to search
    if (typeof req.query.limit !== 'undefined') {
        var limit = parseInt(req.query.limit);
        if (!isNaN(limit)) {
            query.limit(limit);
        }        
    }

    query.exec(function (err, blogs) {
        if (err) {
            res.status(500).send('An error occured retrieving blogs: ' + err);
        } else {
            res.send(blogs);
        }
    });
}