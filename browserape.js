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
    res.sendFile(config.index);
});

app.get("/objects", function(req, res) {
    res.json({
        "tables" : [
           "Content", "Permission", "PermissionRole", "Role", "User", "UserRole", "System"
        ]
    });
});
