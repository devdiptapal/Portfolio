const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8000;

// URL mappings for clean URLs
const urlMappings = {
  '/': '/index.html',
  '/now': '/now.html',
  '/experience': '/experience.html',
  '/values': '/values.html',
  '/blog': '/blog.html'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let filePath = parsedUrl.pathname;

  // Handle clean URLs
  if (urlMappings[filePath]) {
    filePath = urlMappings[filePath];
  }

  // Default to index.html for root
  if (filePath === '/') {
    filePath = '/index.html';
  }

  // Get the file extension
  const ext = path.extname(filePath);
  
  // Set content type based on file extension
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
  };

  const contentType = contentTypes[ext] || 'text/plain';

  // Read the file
  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1><p>The requested file could not be found.</p>');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log('Clean URLs supported:');
  console.log('  http://localhost:8000/');
  console.log('  http://localhost:8000/now');
  console.log('  http://localhost:8000/experience');
  console.log('  http://localhost:8000/values');
  console.log('  http://localhost:8000/blog');
}); 