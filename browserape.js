// Load modules
var http = require("http");
var express = require("express");
var config = require("./config.json");

var app = express();
var server = http.createServer(app);

// Check config
if(!config || !config.port || !config.index)
    return;

// Start server
server.listen(config.port);
app.use(express.static("public"));
app.get("/", function(req, res) {
    res.sendfile(config.index)
});

