const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1n';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('/Users/chitkoko/Desktop/Code/Lumiere/Homepage/Lumierejs/html/index.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
                return;
            }

            const styles = fs.readFileSync('/Users/chitkoko/Desktop/Code/Lumiere/Homepage/Lumierejs/css/styles.css', 'utf8');

            const updatedData = data.replace('</head>', `<style>${styles}</style></head>`);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(updatedData);
        });
    } else if (req.url === '/styles.css') {
        const cssPath = '/Users/chitkoko/Desktop/Code/Lumiere/Homepage/Lumierejs/css/styles.css';
        fs.readFile(cssPath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('send name', (user) => {
        io.emit('send name', user);
    });

    socket.on('send message', (chat) => {
        io.emit('send message', chat);
    });
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
