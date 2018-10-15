var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var stringifyFile;

app.get('/', function(req, res){
    res.send('Homepage');
});

app.get('/getNote', function(req, res){
    fs.readFile('./test.json', 'utf8', function(err, data){
        if (err) throw err;
        stringifyFile = data
        res.send(data);
    })
});

app.post('/updateNote/:note', function(req, res){
        stringifyFile = stringifyFile + req.params.note; //stringifyFile += req.params.note  - 
        fs.writeFile('./test.json', stringifyFile, function(err) {
            if (err) throw err;
            console.log('file updated');
        });
        res.send('Data updated! check "/getNote" url');
});

app.listen(3000);


/*
var server = app.listen(3000, function() {
    console.log('Aplikacja nasłuchuje na http://localhost:3000 ');
});
*/



