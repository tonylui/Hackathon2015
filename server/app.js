var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.get('/', function (req, res) {
    res.send("Status: Up")
});

app.get('/user/:username/notes', function (req, res) {
    //TODO authorization to be done here...

    var username = req.params.username;
    console.log("receive a get request " + username);

    Note.find({username: username}, function (err, data) {
        if (err) return console.error(err);
        res.send(data);
    })
});

app.post('/user/:username/notes', function (req, res) {
    var username = req.params.username;
    var message = req.body.message;

    //TODO authorization to be done here...
    new Note({
        message: message,
        username: username,
        byUser: username, //TODO fix this to allow adding by other user...
        lastUpdate: Date.now(),
        isPublic: false
    }).save(function (err, data) {
            if (err) return console.error(err);

            console.log("Posting data <" + data + "> to database");
            res.send("Success");
        });
});

app.put('/user/:username/:id', function (req, res) {
    var username = req.params.username;
    var id = req.params.id;
    var message = req.body.message;

    Note.update({
        username: username,
        _id: id
    }, {
        message: message
    }, function (err, data) {
        if (err) return console.error(err);

        res.send("Success");
    });
});

app.delete('/user/:username/:id', function (req, res) {
    var username = req.params.username;
    var id = req.params.id;

    Note.remove({username: username, _id: id}, function (err) {
        if (err) return console.error(err);

        res.send("Success");
    });
});

app.listen(3000);

//DB part
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stickyboard');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connect to database successfully');
});

var noteSchema = mongoose.Schema({
    message: String,
    username: String,
    byUser: String,
    lastUpdate: Date,
    isPublic: Boolean
});

var Note = mongoose.model('Note', noteSchema);

