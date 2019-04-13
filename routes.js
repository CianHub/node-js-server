// Imports file system core module for reading/writing files on pc
const fs = require('fs');

const requestHandler = (req, res) => {
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
    const body = [];
    //This listens for an event on the request
    // In this case its the data event
    // This event is fired whenever a new chunk of data is ready to be read
    // The second param is a callback which is executed when a data chunk comes in
    // A bit like RxJS observable
    req.on('data', chunk => {
      body.push(chunk);
    });
    //Adds an event listener for the request end event, when the request is finished
    return req.on('end', () => {
      // Converts the chunk to a readable string
      const parseBody = Buffer.concat(body).toString();
      //Separates the form name from the value entered
      const message = parseBody.split('=')[1];
      // Will create a file (param1 and fill it with param2) synchronously
      //fs.writeFileSync('message.txt', message);
      // This one can take a callback to do when its done via implicit event listener
      fs.writeFile('message.txt', message, () => {
        res.statusCode = 302;
        // Redirects back to /
        res.setHeader('Location', '/');
        return res.end();
      });
    });
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
};

module.exports = requestHandler;
