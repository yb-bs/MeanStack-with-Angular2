var monclient = require('mongodb').MongoClient;
monclient.connect(
		"mongodb://root:root@ds159330.mlab.com:59330/yorbit201_nodejs",
		function(err, db) {
			if (err)
				throw err;
			console.log("Connection established to mongoDB on cloud");
			var mydb = db;

			mydb.collections(function(err, colls) {
				console.log("colls :-" + colls);
				for (var i = 0; i < colls.length; i++) {
					console.log("Collection " + (i + 1) + " : "
							+ colls[i].namespace)
				}
		});

mydb.collection("mystory", function(err, coll) {
	if (err) {
		console.log("mystory collection not found!");
	} else {
		console.log("Found the collection 'mystory' successfully!");
		coll.find({}, function(er, cursor) {
			if (!er) {
				console.log("-----Documents within collection mystory-----");
				cursor.each(function(errADoc, aDoc) {
					if (aDoc) {
						console.log(JSON.stringify(aDoc));
					} else {
						console.log("--::::::--");
					}
				});
			}
		});
		coll.count({}, function(err, count) {
			console.log("No of Documents containing " + count);
		});
		setTimeout(function() {
			mydb.close();
		}, 2000);
	}
});
});