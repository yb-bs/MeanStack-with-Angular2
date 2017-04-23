var exp = require("express");
var app = exp();

app.get('/players', function(req, res) {
	var query = req.query;
	console.log("Query : " + JSON.stringify(query));
	res.end(query.name);
	res.end(JSON.stringify(query));
});
var port = process.env.PORT || 4000;
app.listen(port, function() {
	console.log("Server is listening on PORT " + port);
});