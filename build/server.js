var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var blogRoutes = require('./routes/blog.routes');
var commentRoutes = require('./routes/comment.routes');
var config = require('./config.json');

mongoose.connect(config.dbConnectionString);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/blog', blogRoutes);
app.use('/api/blog', commentRoutes);

app.listen(process.env.PORT || 3000);