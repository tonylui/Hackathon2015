var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer());

app.get('/:username/notes', function(req,res){
    var username = req.params.username;
    console.log("receive a get request " + username);
    res.send("TODO show notes of user "+username);
});

app.post('/:username/notes', function(req,res){
    var username = req.params.username;
    console.log("Posting new note to the database "+ username);
    res.send("TODO post a request for user " + username);
});

//app.update('/:username/notes/:noteId', function(req,res){
//    var username = req.params.username;
//    var noteId = req.params.noteId;
//
//    res.send("TODO update note "+noteId +"for user "+username);
//});

app.listen(3000);