var express = require('express');
var parser = require('body-parser');
var path = require('path');

//  Create the express server
var app = express(); 
var port = process.env.PORT || 3000; 

//  Body Parser
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(parser.text());
app.use(parser.json({type:'application/vnd.api+json'}));

//  Static files to be called before the routes 
app.use(express.static('app/public'));

//  Router
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

app.listen(port, () => console.log("Listening on port %s", port));