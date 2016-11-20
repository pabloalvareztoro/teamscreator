var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://teamnames:teamnames@localhost:27017/teamnames');

var FirstName = require('./app/models/firstName');
var SecondName = require('./app/models/secondName');

var team = require('./app/models/team');

router.use(function(req, res, next) {
    console.log('Endpoint accessed...');
    next();
});

router.route('/').get(function(req, res) {
    res.json({ message: 'Teams Creator REST service' });
});

router.route('/teamcreator/').get(function(req, res) {
    getTeamNames(1, req, res);
});

router.route('/teamcreator/:number').get(function(req, res) {
    getTeamNames(req.params.number, req, res);
});

function getTeamNames(number, req, res){
    FirstName.find({}, function(err, firstnameres) {
        if (err) throw err;
        SecondName.find({}, function(err, secondnameres) {
            if (err) throw err;
            team.createTeams(res, number, firstnameres, secondnameres)
        });
    });
}

app.use('/', router);

app.listen(port);
console.log('Application started on port ' + port);
