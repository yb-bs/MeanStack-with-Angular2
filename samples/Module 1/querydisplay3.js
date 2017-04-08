var exp = require("express");
var app = exp();

app.use(exp.static(__dirname + "/public"))

app.get('/players/:lang/:name', function(req, res) {
	res.write("query name " + req.params.name);
	res.end("      query lang " + req.params.lang);
});
var port = process.env.PORT || 4000;
app.listen(port, function() {
	console.log("Server is listening on PORT " + port);
});