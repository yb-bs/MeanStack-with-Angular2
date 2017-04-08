var exp = require("express");
var app = exp();
var handlers = require("./routes/routes.js");

app.set('view engine', 'ejs');

app.get('/', handlers.homeFn);

app.get('/:city', handlers.cityFn);

var port = process.env.PORT || 4000;
app.listen(port, function() {
	console.log("Server is listening on PORT " + port);
});