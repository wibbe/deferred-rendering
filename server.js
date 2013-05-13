
var path = require('path');
var express = require('express');
var app = express.createServer();

var staticPath = path.join(__dirname, "public");

app.use(express.static(staticPath));
app.use(express.directory(staticPath));
app.listen(8080);

console.log("Server running on http://localhost:8080");