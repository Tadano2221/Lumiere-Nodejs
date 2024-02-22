//after following changes, it works for me by running "node js/server.js" from your root directory.The website looks good!
//I didn't have any zsh permission error. Normally it happens because you don't have read/write permission to your file, you need to modify that
//or you can try to do "sudo node js/server.js" see if it helps
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

//suggestion: You might want to put the relative path instead of full path so other people don't need to modify it
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./html/index.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
                return;
            }
            const styles = fs.readFileSync('./css/styles.css', 'utf8');

            const updatedData = data.replace('</head>', `<style>${styles}</style></head>`);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(updatedData);
        }); //you need to remember to link your pages!
    }else if (req.url === '/chat'){
        fs.readFile('./html/chat.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
                return;
            }

            const styles = fs.readFileSync('./css/styles.css', 'utf8');

            const updatedData = data.replace('</head>', `<style>${styles}</style></head>`);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(updatedData);
        });

    }
     else if (req.url === '/styles.css') {
        const cssPath = './css/styles.css';
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