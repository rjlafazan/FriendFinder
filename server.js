var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var apiRoutes = require("./app/routing/apiRoutes");
var htmlRoutes = require("./app/routing/htmlRoutes");

var app = express();

var PORT = process.env.PORT || 8089;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

apiRoutes(app);

htmlRoutes(app);

app.listen(PORT, function(req, res) {
  console.log("Listening on port: " + PORT);
});
