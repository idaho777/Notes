
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');

//uncomment to connect to the real database
//var db = monk('ds063287.mongolab.com:63287/sjnotes', {
//  username : 'sjnotes',
//  password : 'sjnotes'
//});

//uncomment to connect to the test database
var db = monk('localhost:27017/notestest');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser);
app.get('/getAllNotes', routes.getAllNotes(db));

app.post('/addNote', routes.addNote(db));
app.post('/deleteNote', routes.deleteNote(db));
app.post('/updateNote', routes.updateNote(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


