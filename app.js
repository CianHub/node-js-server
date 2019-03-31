// imports http Node core module, global module as no file path specified
const http = require('http');
// Imports file system core module for reading/writing files on pc
const fs = require('fs');

// This function is run everytime the server recieves a request
// Must take a request and a response to be a valid requestListener function
function requestListener(req, res) {
  // This will use conditional statement to return a different response depending on the url
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    // If URL is / response is a html form
    // User can post the contents on submit to /message where another response is sent
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    // Redirects to /
    res.setHeader('Location', '/');
    return res.end();
  }

  // This tells the browser making a request that the returned response will be a HTML page
  // res.write() writes data to the response
  // res.end() is called when the response finished and it is sent
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from Node</body>');
  res.write('</html>');
  res.end();

  // To close the server
  // process.exit();
}

// Create the server object with the createServer method on the http object
const server = http.createServer(requestListener);

// Start the server with the listen method and a PORT number
// Run Node app.js in terminal to run the server
server.listen(3000);
