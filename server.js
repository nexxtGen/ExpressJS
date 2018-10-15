var express = require('express');
var path = require('path')
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
//app.use(bodyParser.json());

app.use('/', function(req, res, next){
    console.log("Użytkownik nie jest zalogowany.");
    next();
});

app.get('/', function(req, res) {    
    res.send('Witaj na stronie głównej. >>ZALOGUJ<< by mieć dostęp do aplikacji.');
    //res.send('Hello światt');
});

app.use('/:id', function(req, res, next){
    console.log("Autoryzajca użytkownika o id:" + req.params.id);
    next();
});

app.use('/:id', function(req, res, next){
    console.log("Sprawdzanie uprawnień użytkownika o id: " + req.params.id);
    next();
});

app.get('/:id', function(req, res){    
    const index = path.join(__dirname, 'assets', 'form.html');
    res.sendFile(index);    
});

app.use('/userform/:id', function(req, res, next){
    console.log('Jestem pośrednikiem w tym formularzu.');
    next();
});

app.get('/userform/:id', function(req, res){
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        user_id: req.params.id
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







