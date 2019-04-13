// imports http Node core module, global module as no file path specified
const http = require('http');
const routes = require('./routes');

// Create the server object with the createServer method on the http object
const server = http.createServer(routes);

// Start the server with the listen method and a PORT number
// Run Node app.js in terminal to run the server
server.listen(3000);
