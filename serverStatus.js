var mongodb = require('mongodb');
var mongoclient = mongodb.MongoClient;

mongoclient.connect("mongodb://127.0.0.1/nodejs", function(err, db){
	var adminDb = db.admin();
	if(err){
		console.log("Could not connect to DB");
	}
	else{
		adminDb.serverStatus(function(err1, status) {
			console.log(status);
		});
	}
});

console.log("End of program");