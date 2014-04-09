
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
var db = monk('ds063287.mongolab.com:63287/sjnotes', {
  username : 'sjnotes',
  password : 'sjnotes'
});

var app = express();


//mongoLab stuff
// var mongo = require('mongodb');
// var Server = mongo.Server;
// var Db = mongo.Db;

// var server = new Server('ds063287.mongolab.com', 63287, {auto_reconnect : true});
// var db = new Db('sjnotes', server);

// db.open(function(err, client) {
//     client.authenticate('sjnotes', 'sjnotes', function(err, success) {
//         // Do Something ...
//     });
// });
//MongoLabStuff






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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


