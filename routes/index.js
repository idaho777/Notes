/*
 * GET home page.
 */
exports.index = function(req, res){

	res.render('index', { title: '4440Notes' });
};

exports.userlist = function(db) {
	return function(req, res) {
		var collection = db.get('users');
		collection.find({},{},function(e,docs){
			res.render('userlist', {
				"userlist" : docs
			});
		});
	};
};

exports.newuser = function(req, res){
	res.render('newuser', { title: 'Add New User' });
};

// get all of the notes
exports.getAllNotes = function(db) {
	return function(req, res) {
		var collection = db.get('notecollection');
		collection.find({},{}, function(e, docs) {
			res.json(200, {list : docs});
		});
	}
}

//add notes
exports.addNote = function(db) {
	return function(req, res) {
		var title = req.body.title;
		var text = req.body.text;

		var collection = db.get('notecollection');

		collection.insert({
            "title" : title,
            "text" : text
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.json(200, {added : doc});
            }
        });
	}
}

//delete note
exports.deleteNote = function(db) {
	return function(req, res) {
		var id = req.body.id;

		var collection = db.get('notecollection');
		var mongo = require('mongodb');
		var BSON = mongo.BSONPure;
		var o_id = new BSON.ObjectID(id);
		collection.remove({
			"_id" : o_id
		}, function(err, doc) {
			if(err) {
				res.send("you fail...");
			} else {
				res.json(200, {removed: doc});
			}
		});
	}
}

exports.updateNote = function(db) {
	return function(req, res) {
		var id = req.body.id;

		var collection = db.get('notecollection');
		var mongo = require('mongodb');
		var BSON = mongo.BSONPure;
		var o_id = new BSON.ObjectID(id);

		collection.update({
			'_id' : o_id
		}, {
			'title' : req.body.title,
			'text' : req.body.text
		}, function(err, doc) {
			if(err) {
				res.send("you fail...");
			} else {
				res.json(200, {'updated' : doc});
			}
		});
	}
}
