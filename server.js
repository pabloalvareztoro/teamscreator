var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Names = require('./app/models/name');

var teamService = require('./app/models/team');

var RealTeams = require('./app/models/realteam');

var realTeamService = require('./app/models/realteamservice');

router.use(function(req, res, next) {
    console.log('Endpoint accessed...');
    next();
});

router.route('/').get(function(req, res) {
    res.json({ message: 'Teams Creator REST service' });
});

//Non-existent teams

router.route('/teamcreator/nonexistentteams').get(function(req, res) {
    getTeamNames(1, req, res);
});

router.route('/teamcreator/:number').get(function(req, res) {
    getTeamNames(req.params.number, req, res);
});

router.route('/teamcreator/firstname/:name').put(function(req, res) {
    saveName(req.params.name, res, Names.firstName);
});

router.route('/teamcreator/secondname/:name').put(function(req, res) {
    saveName(req.params.name, res, Names.secondName);
});

//Real teams

router.route('/teamcreator/realteam/:name/:league').put(function(req, res) {
    saveRealTeam(req.params.name, req.params.league, res, RealTeams.realTeam);
});

router.route('/teamcreator/realteams/').get(function(req, res) {
    getRealTeams(1, null, req, res);
});

router.route('/teamcreator/realteams/:number').get(function(req, res) {
    getRealTeams(req.params.number, null, req, res);
});

router.route('/teamcreator/realteams/:league').get(function(req, res) {
    getRealTeams(1, req.params.league, req, res);
});

router.route('/teamcreator/realteams/:league/:number').get(function(req, res) {
    getRealTeams(req.params.number, req.params.league, req, res);
});

function getTeamNames(number, req, res){
    Names.firstName.find({}, function(err, firstnameres) {
        if (err) handleError(res, err.message, "Failed to access database.");
        Names.secondName.find({}, function(err, secondnameres) {
            if (err) handleError(res, err.message, "Failed to access database.");
            teamService.createTeams(res, Math.min(number, firstnameres.length, secondnameres.length), firstnameres, secondnameres);
        });
    });
}

function getRealTeams(number, league, req, res){
    var query = (league != null) ? {"league": league} : {};
    RealTeams.realTeam.find(query, function(err, realteamsres) {
        if (err) handleError(res, err.message, "Failed to access database.");
        realTeamService.createRealTeams(res, Math.min(number, realteamsres.length), realteamsres);
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

function saveRealTeam(name, league, res, RealTeam){
    var newRealTeam = new RealTeam({
        name: name,
        league: league
    })
    newRealTeam.save(function(err) {
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
