var mongodb = require('mongodb');
var mongoclient = mongodb.MongoClient;

mongoclient.connect("mongodb://127.0.0.1/nodejs", function(err, db) {
	var mydb = db.db("nodejs");
	if (err) {
		console.log("Could not connect to DB");
	} else {
		mydb.collections(function(err, colls) {
			for (var i = 0; i < colls.length; i++) {
				console.log(colls[i].namespace);
			}
		});
	}
	setTimeout(function() {
		mydb.close();
	}, 3000);
});

console.log("End of program");