var exp = require("express");
var app = exp();
var bodyparser = require('body-parser');
var session = require('express-session');
var hbars = require('express-handlebars');
var routes = require("./routes/routes.js");

// template engine
app.set('view engine', 'handlebars');
app.engine('handlebars', hbars({}));

app.use(exp.static(__dirname + "/public"));

// body parser
app.use(bodyparser());

// session
app.use(session({secret:"secret", resave:true, saveUninitiated:true}));

app.get('/', routes.loginPage);
app.get('/toLanding', routes.landingPage);
app.post('/toCity', routes.cityPage)

var port = process.env.PORT || 4000;
app.listen(port, function() {
	console.log("Server is listening on PORT " + port);
});