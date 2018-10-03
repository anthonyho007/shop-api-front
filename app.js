var express = require('express');
var app = express();
var axios = require('axios');
var config = require('./config');
var url = require('url');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// configure express server
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// setup routes and views

app.get('/', function(req, res){
    res.render('main.ejs');
});

app.post('/signin', jsonParser,function(req, res) {
    var path = "http://" + config.get('BACKEND_SRV_SERVICE_HOST') + ":" + config.get('BACKEND_SRV_SERVICE_PORT');
    axios({ method: "POST", "url": path + "/signin",
        "data": {
            "name": req.body.name,
            "password": req.body.password
        },
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(result => {
        if (result.status == 200) {
            res.redirect(url.format({
                pathname: "/shop",
                query: {
                    "name":result.data.name
                }
            }));
        } else {
            res.redirect('/');
        }
    }, err => {
        console.log(err);
    });
})

app.get('/shop', function(req, res) {
    if (req.query.name == "") {
        res.redirect('/');
    }else {
        res.render('shop.ejs', {
            name: req.query.name
        });
    }
});

app.get('/signout', function(req, res){
    res.redirect('/');
});

// listen
const server = app.listen(config.get('PORT'), ()=> {
    const address = server.address().port;
    console.log('Listening on ' + address);
})

module.exports = app;


