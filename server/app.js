var config = require("./config.js");
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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


app.get('/user', function(req,res){

    User.find({},function(err, data){
        res.send(data);
    });

});

app.post('/user', function(req,res){
    var username = req.body.username;
    var facebookId = req.body.facebookId;

    User.find({username: username})

    new User({
        username:username,
        facebookId:facebookId
    })

});

app.listen(3000);

//DB part
var mongoose = require('mongoose');
mongoose.connect('mongodb://'+config.dbhost+'/stickyboard');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connect to database successfully');
});

//Note schema
var noteSchema = mongoose.Schema({
    message: String,
    username: String,
    byUser: String,
    lastUpdate: Date,
    isPublic: Boolean,
    x: Number,
    y: Number,
    z: Number,
    height: Number,
    width: Number
});

var Note = mongoose.model('Note', noteSchema);

//User schema
var userSchema = mongoose.Schema({
    username: String,
    facebookId: String
});

var User = mongoose.model('User', userSchema);