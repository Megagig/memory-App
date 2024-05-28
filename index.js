const http = require('http');
const fs = require('fs');
const authMiddleware = require('./auth');

const server = http.createServer((req, res) => {
  authMiddleware(req, res, () => {
    if (req.url === '/memories' && req.method === 'GET') {
      fs.readFile('./memories.json', 'utf8', (err, data) => {
        res.end(data);
      });
    } else if (req.url === '/memories' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        fs.readFile('./memories.json', 'utf8', (err, data) => {
          const memories = JSON.parse(data);
          memories.push(JSON.parse(body));
          fs.writeFile('./memories.json', JSON.stringify(memories), (err) => {
            res.end('Memory created');
          });
        });
      });
    } else {
      res.end('Invalid route');
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
