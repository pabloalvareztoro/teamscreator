var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://teamnames:teamnames@localhost:27017/teamnames');

var Names = require('./app/models/name');

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

router.route('/teamcreator/firstname/:name').get(function(req, res) {
    saveName(req.params.name, res, Names.firstName);
});

router.route('/teamcreator/secondname/:name').get(function(req, res) {
    saveName(req.params.name, res, Names.secondName);
});

function getTeamNames(number, req, res){
    Names.firstName.find({}, function(err, firstnameres) {
        if (err) handleError(res, err.message, "Failed to access database.");
        Names.secondName.find({}, function(err, secondnameres) {
            if (err) handleError(res, err.message, "Failed to access database.");
            team.createTeams(res, Math.min(number, firstnameres.length, secondnameres.length), firstnameres, secondnameres);
        });
    });
}

function saveName(name, res, Name){
    var newName = new Name({
        name: name
    })
    newName.save(function(err) {
        if (err) handleError(res, err.message, "Failed to access database.");
        console.log('Name saved successfully!');
        res.json({ message: 'Name saved!' });
    });
}

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.use('/', router);

app.listen(port);
console.log('Application started on port ' + port);
