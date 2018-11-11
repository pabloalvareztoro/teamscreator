var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

router.route('/teamcreator/nonexistentteams/:number').get(function(req, res) {
    getTeamNames(req.params.number, req, res);
});

router.route('/teamcreator/firstname/:name').put(function(req, res) {
    saveName(req.params.name, res, Names.firstName);
});

router.route('/teamcreator/secondname/:name').put(function(req, res) {
    saveName(req.params.name, res, Names.secondName);
});

//Real teams

router.route('/teamcreator/realteam').post(function(req, res) {
    saveRealTeam(req.body, res, RealTeams.realTeam);
});

router.route('/teamcreator/realteam/:id').put(function(req, res) {
    updateRealTeam(req.params.id, req.body, res, RealTeams.realTeam);
});

router.route('/teamcreator/realteam/:id').delete(function(req, res) {
    deleteRealTeam(req.params.id, res, RealTeams.realTeam);
});

router.route('/teamcreator/realteams').get(function(req, res) {
    getRealTeams(1, null, req, res);
});

router.route('/teamcreator/realteams/:number').get(function(req, res) {
    getRealTeams(req.params.number, null, req, res);
});

router.route('/teamcreator/realteams/:number/:league').get(function(req, res) {
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

function saveRealTeam(body, res, RealTeam){
    var newRealTeam = createNewRealTeamObject(uuid.v1(), body)
    newRealTeam.save(function(err) {
        if (err) handleError(res, err.message, "Failed to access database.");
        console.log('Team saved successfully!');
        res.json({ message: 'Team saved!' });
    });
}

function updateRealTeam(id, body, res, RealTeam){
    var newRealTeam = createNewRealTeamObject(id, body)
    newRealTeam.save({"_id": id}, function(err) {
        if (err) handleError(res, err.message, "Failed to access database.");
        console.log('Team updated successfully!');
        res.json({ message: 'Team saved!' });
    });
}

function deleteRealTeam(id, body, res, RealTeam){
    newRealTeam.delete({"_id": id}, function(err) {
        if (err) handleError(res, err.message, "Failed to access database.");
        console.log('Team deleted successfully!');
        res.json({ message: 'Team saved!' });
    });
}

function createNewRealTeamObject(id, body){
    var newRealTeam = new RealTeam(id)
    newRealTeam.name = body.name
    newRealTeam.league = body.league
    newRealTeam.city = body.city
    newRealTeam.country = body.country
    newRealTeam.stadium = body.stadium
}

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.use('/', router);

app.listen(port);
console.log('Application started on port ' + port);
