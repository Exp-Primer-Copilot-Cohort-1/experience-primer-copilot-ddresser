// create web server and listen to port 3000
// to run: node comments.js

const express = require('express');
const app = express();
const port = 3000;

// add static files
app.use(express.static('public'));

// add body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// add mongoose
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/comments';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

// define schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// define model
const Comment = mongoose.model('Comment', commentSchema);

// get request
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index.ejs', {comments: comments});
        }
    });
});

// post request
app.post('/comments', (req, res) => {
    Comment.create(req.body, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            console.log(comment);
            res.redirect('/comments');
        }
    });
});

// start server
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});