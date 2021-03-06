require('dotenv').config(); 
var express = require("express"); 
var bodyParser = require("body-parser");
var session = require("express-session"); 
var passport = require("./config/passport"); 
var exphbs = require("express-handlebars");
var path = require('path');
var favicon = require('serve-favicon');

var PORT = process.env.PORT || 3000;
var db = require("./models");

var app = express();

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
