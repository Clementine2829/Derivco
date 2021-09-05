const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {

    //build file path
    let filePath = path.join(__dirname, 'public', req.url == '/' ? 'main1.html' : req.url);

    //for uploading
    //data = req.url.search(data);

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
            let addr = url.parse(req.url);
            console.log(addr.pathname);
            console.log(addr.search);
            let log_err = '\nError: ' + err.code;
            if (addr.pathname == "/upload.html") {
                data = addr.search.substring(6); //exclude the '/data=' characters
                let temp_data = data.split(",");
                data = "";
                let highest = temp_data[0].substring(temp_data[0].indexOf('Score:')+6, temp_data[0].length - 1); //highest is the first one
                let highest_index = 0;
                let best_match = "";
                for (let i = 0; i < temp_data.length; i++) {
                    data += temp_data[i] + '\n';
                    let score = temp_data[i].substring(temp_data[i].indexOf('Score:')+6, temp_data[i].length - 1);

                    //find highest
                    if (i == 0) continue //if the first value then assume it is the highest
                    else {
                        highest = Math.max(parseInt(highest), parseInt(score));
                        if (highest == parseInt(score)) highest_index = i;
                        best_match = temp_data[highest_index];
                        if (parseInt(highest) >= 80) best_match += ", good match";
                    }
                }
                console.log("Data: " + temp_data);
                fs.writeFile(path.join(__dirname, '/public', 'output.txt'), data, err => {
                    if (err) throw err
                    console.log("Data written to output.txt file");
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write("Data saved to file successfully.<br>" + best_match);
                    res.end();
                })
            }else if (err.code == "ENOENT") {
                //page not found
                log_err += ", Page Not found: " + req.url;
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                //server error 505
                log_err += ", Server error: " + req.url;
                res.writeHead(500);
                res.end(`Server error ${err.code}`);
            }
           //create and write log file 
            //fs.writeFile(path.join(__dirname, '/public', 'errors.log'), log_err, err => {
            //    if (err) throw err
            //    console.log("Error logged");

            //file appended
            fs.appendFile(
                path.join(__dirname, '/public', 'errors.log'), log_err,
                err => {
                    if (err) throw err
                    console.log("Error logged on append");
            })
            //})
        } else {
            //success 
            console.log(content);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
            console.log(req.url);
        }
    })

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

