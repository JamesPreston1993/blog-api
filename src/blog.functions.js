var Blog = require('./blog.model');

module.exports = {
    create: createBlog,
    update: updateBlog,
    delete: deleteBlog,
    view: viewBlog,
    viewMany: viewBlogs
};

function createBlog () {
    
}

function updateBlog () {

}

function deleteBlog () {

}

function viewBlog (req, res) {
    if (typeof req.params.id === 'undefined') {
        res.status(400).send('An id was not provided');
    }

    Blog.findById(req.params.id, '-comments').populate('creator').exec(function (err, blog) {
        if (err) {
            res.status(500).send('An error occurred retrieving blog: ' + err);
        }

        if (!blog) { 
            res.status(404).send('Blog with the provided id could not be found');
        } else {
            res.send(blog);
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