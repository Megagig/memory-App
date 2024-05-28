const http = require('http');
const authMiddleware = require('./auth');

const server = http.createServer((req, res) => {
  authMiddleware(req, res, () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
