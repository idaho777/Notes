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
			console.log("using this");
			res.json(200, {list : docs});
		});
	}
}
