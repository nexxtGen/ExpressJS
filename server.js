var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
//app.use(bodyParser.json());



app.use('/store', function(req, res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store, biorę 50% z góry');
    next();
});

app.use('/userform', function(req, res, next){
    console.log('Jestem pośrednikiem w tym formularzu.');
    next();
});

app.use(express.static('assets'));
//next();

app.get('/', function(req, res){
    res.sendFile('/index.html');
    //res.send('Hello światt');
});

app.get('/store', function(req, res) {
    res.send('To jest shop.');
});

app.get('/userform', function(req, res){
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.end(JSON.stringify(response));
});



var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;    

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.use(function (req, res, next) {
    res.status(404).send('Nic nie znaleziono!');
});







