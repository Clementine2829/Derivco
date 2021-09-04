const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

    //build file path
    let filePath = path.join(__dirname, 'public', req.url == '/' ? 'main1.html' : req.url);

    //set the content type 
    let extname = path.extname(filePath);

    //initial content type 
    let contentType = 'text/html';
    //check the ext and set it 
    switch (extname) {
        case '.js':
            contentType = "text/javascript";
            break;
        case '.css':
            contentType = "text/css";
            break;
        case '.json':
            contentType = "appliication/json";
            break;
        case '.txt':
            contentType = "text/txt";
            break;
    }

    //read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == "ENOENT") {
                //page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                //server error 505
                res.writeHead(500);
                res.end(`Server error ${err.code}`);
            }
        } else {
            //success 
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');

        }
    })

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

