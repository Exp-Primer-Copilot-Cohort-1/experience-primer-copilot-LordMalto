// Create a web server
// Run it by node comments.js
// Access it via http://localhost:3000

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments.json');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var url = request.url;
  var method = request.method;
  var body = '';

  if (url === '/') {
    if (method === 'GET') {
      response.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile('index.html', 'utf8', function(err, data) {
        if (err) throw err;
        response.write(data);
        response.end();
      });
    }
  }
  else if (url === '/comments') {
    if (method === 'GET') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(comments));
      response.end();
    }
    else if (method === 'POST') {
      request.on('data', function (chunk) {
        body += chunk;
      });
      request.on('end', function () {
        var obj = qs.parse(body);
        comments.push(obj);
        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
          if (err) throw err;
          console.log('It\'s saved!');
        });
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(comments));
        response.end();
      });
    }
  }
  else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 Not Found\n');
    response.end();
  }
});

// Listen on port 3000, IP defaults to



