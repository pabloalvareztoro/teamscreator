var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

var league = require('./app/models/league');

router.route('/').get(function(req, res) {
    res.json({ message: 'Teams Creator REST service' });
});

router.route('/teamscreator/:number').get(function(req, res) {
    res.json({ teams: league.getTeams(+req.params.number) });
});

app.use('/', router);

app.listen(port);
console.log('Application started on port ' + port);
